import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { useNavigate, useParams } from "react-router";
import { useSecureLS } from "@/hooks/useSecureLS";
import { useBookApi } from "@/presentation/logics/app/books";
import { useCategoryApi } from "@/presentation/logics/app/categories";
import { useGenreApi } from "@/presentation/logics/app/genres";

const CreateBook = () => {
  const [originalTitle, setOriginalTitle] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState(null);
  const [pages, setPages] = useState(null);
  const [stock, setStock] = useState(null);
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const { id } = useParams();
  const { getItem } = useSecureLS();
  const { createBook } = useBookApi();
  const { updateBook } = useBookApi();
  const { useAllCategories } = useCategoryApi();
  const { data: categories } = useAllCategories();
  const { useAllGenres } = useGenreApi();
  const { data: genres } = useAllGenres();
  const user = getItem("user");

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    // Buat preview
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const toast = useRef(null);

  async function handleSubmit() {
    console.log(originalTitle, title, author, preview);
    try {
      if (id) {
        await updateBook.mutateAsync({
          id: id,
          payload: {
            title,
            author,
            year: year.getFullYear(),
            ISBN: isbn,
            cover: preview,
            categoryId: selectedCategory.id,
            genreId: selectedGenre.id,
            pdf_url: pdfFile,
            stock,
            updatedById: user.id,
            description,
            language: language.name,
            pages,
            originaltitle: originalTitle,
          },
        });
      } else {
        await createBook.mutateAsync({
          title,
          author,
          year: year.getFullYear(),
          ISBN: isbn,
          cover: preview,
          categoryId: selectedCategory.id,
          genreId: selectedGenre.id,
          pdf_url: pdfFile,
          stock,
          createdById: user.id,
          description,
          language: language.name,
          pages,
          originaltitle: originalTitle,
        });
      }
      navigate("/app/books");
    } catch (err) {
      console.log("Gagal menambahkan buku. :", err.message);
    }
  }

  const onUpload = (e) => {
    console.log("file upload", e);
    setPdfFile(e.files[0]);
    // toast.current.show({
    //   severity: "info",
    //   summary: "Success",
    //   detail: "File Uploaded",
    // });
  };

  const languages = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "United Kingdom", code: "UK" },
    { name: "Australia", code: "AU" },
  ];

  return (
    <>
      <div className="flex justify-content-between align-items-center p-4 mb-3">
        <h2>Create New Book</h2>
      </div>
      <div className="flex gap-3 p-4">
        <div className="flex flex-column flex-1 gap-3 mb-3 ">
          <Card title="Book Cover"></Card>
          <Card title="Book Information" className="">
            <FloatLabel className="mb-5">
              <InputText
                required
                id="originalTitle"
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                className="w-full p-3 "
              />
              <label htmlFor="originalTitle">Original Title</label>
            </FloatLabel>

            <FloatLabel className="mb-5">
              <label htmlFor="title">Title</label>
              <InputText
                required
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3"
              />
            </FloatLabel>

            <FloatLabel className="mb-5">
              <label htmlFor="author">Author</label>
              <InputText
                required
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-3 "
              />
            </FloatLabel>

            <Dropdown
              value={language}
              onChange={(e) => setLanguage(e.value)}
              options={languages}
              optionLabel="name"
              placeholder="Select a Language"
              className="w-full"
            />
          </Card>
          <Card title="Description Book (Optional)" className="">
            <FloatLabel className="">
              <InputTextarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                cols={37}
                style={{ width: "100%", resize: "none" }}
              />
            </FloatLabel>
          </Card>
          <Card title="Cover Book" className="">
            {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
            <Toast ref={toast}></Toast>
            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onUpload}
              onSelect={(e) => {
                const selected = e.files && e.files[0];
                if (selected) {
                  setPreview(URL.createObjectURL(selected));
                }
              }}
              type="file"
            />

            {preview && (
              <div>
                <p className="text-gray-500 mt-3">Preview:</p>
                <img
                  src={preview}
                  alt="preview"
                  className="w-48 rounded-lg shadow"
                />
              </div>
            )}
          </Card>
          <Card title="Upload Pdf file" className="">
            <Toast ref={toast}></Toast>
            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept=".pdf,.epub"
              maxFileSize={1000000}
              customUpload
              uploadHandler={onUpload}
              onSelect={(e) => {
                console.log("Selected file:", e);
              }}
              type="file"
            />
          </Card>
        </div>
        <div className="flex flex-column flex-1 gap-3 mb-3 ">
          <Card title="Book Release Year" className="">
            <FloatLabel className="mb-5">
              <label htmlFor="year">Year</label>
              <Calendar
                id="year"
                value={year}
                showIcon
                showButtonBar
                onChange={(e) => setYear(e.value)}
                view="year"
                dateFormat="yy"
                className="w-full"
              />
            </FloatLabel>
          </Card>
          <Card
            title="Number Fields "
            className=""
            style={{ height: "fit-content" }}
          >
            <label htmlFor="isbn" className="font-bold block mb-2">
              ISBN
            </label>
            <InputNumber
              id="isbn"
              value={isbn}
              onValueChange={(e) => setIsbn(e.value)}
              className="w-full mb-4 "
              useGrouping={false}
            />

            <label htmlFor="pages" className="font-bold block mb-2">
              Pages
            </label>
            <InputNumber
              id="pages"
              value={pages}
              onValueChange={(e) => setPages(e.value)}
              className="w-full mb-4 "
              useGrouping={false}
            />

            <label htmlFor="stock" className="font-bold block mb-2">
              Stock
            </label>
            <InputNumber
              id="stock"
              value={stock}
              onValueChange={(e) => setStock(e.value)}
              className="w-full mb-4 "
              useGrouping={false}
            />
          </Card>
          <Card title="Tags" className="">
            <Dropdown
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.value)}
              options={categories}
              optionLabel="name"
              placeholder="Select a Category"
              className="w-full mb-3"
              checkmark={true}
              highlightOnSelect={false}
            />
            <Dropdown
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.value)}
              options={genres}
              optionLabel="name"
              placeholder="Select a Genre"
              className="w-full "
              checkmark={true}
              highlightOnSelect={false}
            />
          </Card>
          <div className="gap-2 flex justify-content-end">
            <Button
              label="Back"
              icon="pi pi-arrow-left"
              className="mt-2 p-button-info"
              onClick={() => navigate("/app/books")}
            />
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="mt-2 p-button-danger"
              onClick={() => navigate("/app/books")}
            />
            <Button
              label="Save Book"
              icon="pi pi-check"
              className="mt-2"
              onClick={handleSubmit}
            />
          </div>
        </div>

        {/* <Card
          title="Book Release Year"
          className="col-span-2 ml-2"
          style={{ height: "fit-content" }}
        >
          <FloatLabel className="mb-5">
            <label htmlFor="year">Year</label>
          </FloatLabel>
        </Card> */}
      </div>
    </>
  );
};

export default CreateBook;
