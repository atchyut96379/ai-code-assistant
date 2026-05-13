import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        stream: true,
      });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content =
              chunk.choices[0]?.delta
                ?.content || "";

            controller.enqueue(
              encoder.encode(content)
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type":
          "text/plain; charset=utf-8",
      },
    });
  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        error:
          error.message ||
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}