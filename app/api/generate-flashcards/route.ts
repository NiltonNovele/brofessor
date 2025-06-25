import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const prompt = `
Generate 5 concise question and answer flashcards from the following text. Format your response as a JSON array with objects having "question", "answer", and "reference".

Text:
${text}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or 'gpt-4', 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    const rawText = data.choices[0].message.content;

    // Try to parse JSON from AI response
    let flashcards = [];
    try {
      flashcards = JSON.parse(rawText);
    } catch {
      // fallback: return raw text if parse fails
      return NextResponse.json({ error: 'Failed to parse AI response', rawText }, { status: 500 });
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
