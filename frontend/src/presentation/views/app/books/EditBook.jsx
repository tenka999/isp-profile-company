import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState, useRef, useEffect } from "react";
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
import { Dialog } from "primereact/dialog";

const CreateBook = () => {
  const { id: idBook } = useParams();
  const {findById} = useBookApi();
  const { data: bookData, isLoading } = findById(idBook);
  const [originalTitle, setOriginalTitle] = useState("");
  const [title, setTitle] = useState( "");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(null);
  const [isbn, setIsbn] = useState( null);
  const [pages, setPages] = useState( null);
  const [stock, setStock] = useState(null);
  const [language, setLanguage] = useState(null);
  const [description, setDescription] = useState( "");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const { getItem } = useSecureLS();
  const { createBook } = useBookApi();
  const { updateBook } = useBookApi();
  const { useAllCategories } = useCategoryApi();
  const { data: categories } = useAllCategories();
  const { useAllGenres } = useGenreApi();
  const { data: genres } = useAllGenres();
  const user = getItem("user");
  const {id} = useParams();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [cover, setCover] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const toast = useRef(null);

   const customBase64Uploader = async (event) => {
     // convert file to base64 encoded
     const file = event.files[0];
     const reader = new FileReader();
     let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

     reader.readAsDataURL(blob);

     reader.onloadend = function () {
       const base64data = reader.result;
     };
   };

  async function handleSubmit() {
    console.log(originalTitle, title, author, preview);
    console.log(selectedGenre.id, selectedCategory.id);
    try {
      console.log("Creating book:", language);
      if (id) {
        await updateBook.mutateAsync({
          id: idBook,
          payload: {
            title,
            author,
            year: year.getFullYear(),
            ISBN: isbn,
            cover,
            categoryId: selectedCategory.id,
            genreId: selectedGenre.id,
            pdf_file: pdfFile,
            stock,
            updatedById: user.id,
            description,
            language : language,
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
          cover,
          categoryId: selectedCategory.id,
          genreId: selectedGenre.id,
          pdf_file: pdfFile,
          stock,
          createdById: user.id,
          description,
          language,
          pages,
          originaltitle: originalTitle,
        });
      }
      navigate("/app/books");
      console.log("cover payload:", preview);
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
    { name: "United States", value: "United States" },
    { name: "Canada", value:"Canada" },
    { name: "United Kingdom", value:"United Kingdom" },
    { name: "Australia", value:"Australia" },
  ];


  useEffect(() => {
    if (bookData) {
      setOriginalTitle(bookData.detailbook?.originaltitle || "");
      setTitle(bookData.title || "");
      setAuthor(bookData.author || "");
      setYear(bookData.year ? new Date(bookData.year, 0, 1) : null);
      setIsbn(bookData.ISBN || null);
      setPages(bookData.detailbook?.pages || null);
      setStock(bookData.stock || null);
      setLanguage(bookData.detailbook?.language || null);
      setDescription(bookData.detailbook?.description || "");
      setSelectedCategory(
        categories?.find((cat) => cat.id === bookData.categoryId) || null
      );
      setSelectedGenre(
        genres?.find((gen) => gen.id === bookData.genreId) || null
      );
      setPreview(backendUrl + '/' + bookData.cover || null);
      setPdfFile(bookData.pdf_file || null);
    }
  }, [bookData]);

function onclick(){
  console.log(language, 'language');
  console.log(description, 'language');
}

  return (
    <>
      <button onClick={onclick}>klik</button>
      <div className="flex justify-content-between align-items-center p-4 mb-3">
        <h2>Update Book</h2>
      </div>
      <div className="flex gap-3 p-4">
        <div className="flex flex-column flex-1 gap-3 mb-3 ">
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
              optionValue="value"
              placeholder="Select a Language"
              className="w-full "
              checkmark={true}
              highlightOnSelect={false}
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
                  console.log("Selected file:", selected);
                  setCover(selected);
                }
              }}
              customUpload
              uploadHandler={customBase64Uploader}
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
                const selected = e.files && e.files[0];
                if (selected) {
                  console.log("Selected file:", selected);
                  setPdfFile(selected);
                }}}
              type="file"
            />
          </Card>
          <PreviewPdf pdfFile={pdfFile} />
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


function PreviewPdf(file_url){
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(file_url);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        label="Preview"
        icon="pi pi-eye"
        onClick={() => setVisible(true)}
      ></Button>

      <Dialog
        maximizable
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="">
          <iframe
            src={backendUrl + "/" + file_url.pdfFile}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </Dialog>
    </>
  );
}

export default CreateBook;
