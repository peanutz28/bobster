import Anthropic from '@anthropic-ai/sdk'
import { brokers } from '../data/brokers'

// API key is loaded from env — users set VITE_ANTHROPIC_API_KEY in .env.local
// For production, route through a backend proxy instead of exposing the key client-side
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined

export async function generateRiskSummary(
  firstName: string,
  lastName: string,
  state: string,
): Promise<string> {
  if (!apiKey) {
    throw new Error('No API key configured')
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const highRiskBrokers = brokers.filter(b => b.dangerLevel === 'high').map(b => b.name).join(', ')
  const totalBrokers = brokers.length

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [
      {
        role: 'user',
        content: `You are Bob, a friendly privacy helper lobster 🦞. Write a short, plain-English personal privacy risk summary for ${firstName} ${lastName} in ${state}.

Keep it friendly, clear, and under 200 words. Mention:
- That their info is likely on ${totalBrokers}+ data broker sites
- Which high-risk sites to tackle first (from: ${highRiskBrokers})
- The specific risk of living in ${state} (some states have weaker privacy laws)
- What types of data are typically exposed (address, phone, relatives, etc.)
- An encouraging note that Bobster will walk them through every step

Write in second person ("your data", "you'll want to"). Friendly but factual. No bullet points — flowing prose. End with encouragement.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')
  return content.text
}
