import { createClient } from "@/lib/supabase/client";
import { Board } from "./supabase/models";

const supabase = createClient();

export const boardService = {
  async getBoards(userId: string): Promise<Board[]> {
    const { data: boards, error } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return boards || [];
  },

  async createBoard(
    board: Omit<Board, "id" | "created_at" | "updated_at">,
  ): Promise<Board> {
    const { data, error } = await supabase
      .from("boards")
      .insert(board)
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};
