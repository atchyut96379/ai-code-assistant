import { groq } from "@/lib/groq";
import { auth } from "@clerk/nextjs/server";

import {
  createConversation,
  saveMessage,
} from "@/actions/chat";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const messages = body.messages || [];

    const lastMessage =
      messages[messages.length - 1];

    const userPrompt =
      lastMessage?.content || "";

    // Create conversation
    const conversation =
      await createConversation(
        userId,
        userPrompt.slice(0, 40)
      );

    if (!conversation) {
      return Response.json(
        {
          error:
            "Failed to create conversation",
        },
        { status: 500 }
      );
    }

    // Save user message
    await saveMessage(
      conversation.id,
      "user",
      userPrompt
    );

    // AI Completion
    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",
        messages,
      });

    const aiResponse =
      completion.choices[0]?.message
        ?.content || "No response";

    // Save assistant message
    await saveMessage(
      conversation.id,
      "assistant",
      aiResponse
    );

    return Response.json({
      role: "assistant",
      content: aiResponse,
      conversationId:
        conversation.id,
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