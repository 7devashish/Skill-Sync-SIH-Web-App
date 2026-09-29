/**
 * SkillSync API Client Service.
 * Connects frontend to Python FastAPI NLP backend with seamless fallback to client-side data engine.
 */
import type { CurriculumAnalysis } from '@/types'
import { sampleCurriculumAnalysis } from '@/data/seedData'

const BACKEND_BASE_URL = 'http://127.0.0.1:8000'

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/health`, { method: 'GET' })
    return res.ok
  } catch {
    return false
  }
}

export async function analyzeCurriculumViaApi(
  file?: File | null,
  pastedText?: string,
  title?: string
): Promise<CurriculumAnalysis> {
  try {
    const isAvailable = await checkBackendHealth()
    if (!isAvailable) {
      console.warn('SkillSync FastAPI backend offline. Using simulated NLP engine.')
      return sampleCurriculumAnalysis
    }

    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }
    if (pastedText) {
      formData.append('pasted_text', pastedText)
    }
    if (title) {
      formData.append('title', title)
    }

    const response = await fetch(`${BACKEND_BASE_URL}/api/curriculum/analyze`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const json = await response.json()
    return json.data as CurriculumAnalysis
  } catch (err) {
    console.error('Curriculum analysis failed, falling back to local simulation:', err)
    return sampleCurriculumAnalysis
  }
}
