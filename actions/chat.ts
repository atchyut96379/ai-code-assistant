"use server";

import { getSupabaseClient } from "@/lib/supabase";

export async function createConversation(
  userId: string,
  title: string
) {
  const supabase =
    getSupabaseClient();

  const { data, error } =
    await supabase
      .from("conversations")
      .insert([
        {
          user_id: userId,
          title,
        },
      ])
      .select()
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function saveMessage(
  conversationId: string,
  role: string,
  content: string
) {
  const supabase =
    getSupabaseClient();

  const { error } =
    await supabase
      .from("messages")
      .insert([
        {
          conversation_id:
            conversationId,
          role,
          content,
        },
      ]);

  if (error) {
    console.error(error);
  }
}