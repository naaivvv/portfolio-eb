export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY is not configured.' }), { status: 500 });
  }

  try {
    const body = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://edwin-bayog.vercel.app",
        "X-Title": "Edwin Bayog Portfolio",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: body.messages,
        stream: true,
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return new Response(response.body, { status: response.status });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("OpenRouter Proxy Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch AI response from OpenRouter' }), { status: 500 });
  }
}
