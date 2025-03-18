"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button, Group } from "@mantine/core";

interface TiptapEditorProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {

  if (typeof onChange !== "function") {
    return <p style={{ color: "red" }}>⚠️ 編輯器發生錯誤，onChange 未正確傳入！</p>;
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "請輸入內容...",
      }),
      Image,
      Link.configure({ openOnClick: true }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return <p style={{ color: "gray" }}>編輯器載入中...</p>;

  const addImage = () => {
    const url = prompt("請輸入圖片網址");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = prompt("請輸入網址");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  return (
    <div>
      <Group spacing="xs" mb="sm">
        <Button size="xs" variant="default" onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </Button>
        <Button size="xs" variant="default" onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </Button>
        <Button size="xs" variant="default" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          標題
        </Button>
        <Button size="xs" variant="default" onClick={addLink}>
          連結
        </Button>
      </Group>

      <EditorContent
        editor={editor}
        style={{
          minHeight: 200,
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: 8,
          marginTop: 8,
        }}
      />
    </div>
  );
}
