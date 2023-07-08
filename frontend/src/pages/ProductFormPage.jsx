import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CategoryLabels from "../components/CategoryLabels";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";

const ProductFormPage = () => {

  const { id } = useParams()
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/products/' + id).then(response => {
      const { data } = response
      setTitle(data.title);
      setName(data.name);
      setPhotos(data.photos);
      setDescription(data.description);
      setCategory(data.category);
      setExtraInfo(data.extraInfo);
      setColor(data.color);
      setBrand(data.brand);
      setSize(data.size);
      setPrice(data.price);
    })
  }, [id])


  const inputHeader = (text) => <h2 className="text-2xl mt-4">{text}</h2>;
  const inputDescription = (text) => (
    <p className="text-gray-500 text-sm">{text}</p>
  );

  const preInput = (header, description) => (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const productData = { title, name, photos, description, category, extraInfo, color, brand, size, price }

    if (id) {
      await axios.put('/products', { id, ...productData })
      setRedirect(true)
    } else {
      await axios.post('/products', productData)
      setRedirect(true)
    }
  }




  if (redirect) {
    return <Navigate to={'/account/product'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveProduct}>
        {preInput("Titulo", "Titulo para tu Producto")}
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("Nombre", "Nombre del Producto")}

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {preInput("Fotos", "Fotos del producto")}
        <PhotosUploader photo={photos} onChange={setPhotos} />
        {preInput("Descripcion", "Descripcion del producto")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Categoria", "Elige la categoria")}

        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <CategoryLabels selected={category} onChange={setCategory} />
        </div>
        {preInput("Informacion Extra", "como procedencia del producto... etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput("Color-Marca-Tamaño-Precio", "marca,color , tamaño del producto y Precio")}

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
           <div className="">
            <h3 className="mt-2 -mb-1 ">Color</h3>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            </div>
          <div className="">
            <h3 className="mt-2 -mb-1 ">Marca</h3>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="">
            <h3 className="mt-2 -mb-1 ">Tamaño</h3>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Precio del Producto</h3>
            <input type="number" value={price}
              onChange={ev => setPrice(ev.target.value)} />
          </div>

        </div>
        
        <button className="primary my-4">Guardar</button>

     
      </form>
    </div>
  );
};

export default ProductFormPage;
