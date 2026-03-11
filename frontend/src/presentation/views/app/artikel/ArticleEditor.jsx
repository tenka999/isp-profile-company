import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { InputTextarea } from "primereact/inputtextarea";

export default function ArticleEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <div className="field">
        <label htmlFor="konten">Konten</label>
        {/* <InputTextarea
          id="konten"
          value={artikel.konten}
          onChange={(e) => onInputChange(e, "konten")}
          required
          rows={5}
          className={classNames({
            "p-invalid": submitted && !artikel.konten,
          })}
        /> */}
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
