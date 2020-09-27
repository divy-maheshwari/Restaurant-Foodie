import React,{useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { ProductSave,ProductDelete } from '../../actions/productActions';
import {useHistory}from 'react-router-dom'


const ProductScreen = () => {
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');
    const [countInStock,setCountInStock] = useState(0);
    const [modalVisible,setModalVisible] = useState(false);
    const [products,setProducts] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave,success: successSave,error:errorSave} = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const {success: successDelete} = productDelete;

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
        setCountInStock(product.countInStock);
    }
    useEffect(() => {
        if(successSave) {
            setModalVisible(false);
        }
        axios.get('http://localhost:5000/api/products')
                                  .then(data => {
                                      setProducts(data.data);
                                  })
    },[successSave,successDelete]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(ProductSave(id,name,image,price,description,countInStock));

    }

    const deleteHandler = () => {
       dispatch(ProductDelete(id));
       history.push('/products');
    }
    
    const uploadHandler = (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('image',file);
      axios.post('http://localhost:5000/api/products/upload',bodyFormData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(data => {
        console.log(data.data);
        setImage(`${data.data}`);
      })
      .catch(err => {
        console.log(err);
      });
    }



    return (
        <div>
        <button className="btn btn-success" onClick={() => openModal({})}>
          Create Product
        </button>
        {loadingSave && <div>Loading...</div>}
        {errorSave && <div>{errorSave}</div>}
        {modalVisible && (
        <form onSubmit={e => handleSubmit(e)} style={{margin: "auto",width: "25%"}}>
        <div className="form-group ">
        <label htmlFor="exampleInputName">Name</label>
        <input type="text" className="form-control" name="name" value={name} onChange={event => setName(event.target.value)} id="exampleInputName" required/>
      </div>
      <div className="form-group ">
        <label htmlFor="exampleInputPrice">Price</label>
        <input type="number" className="form-control" name="price" value={price} onChange={event => setPrice(event.target.value)} id="exampleInputPrice" required/>
      </div>
      <div className="form-group ">
        <label htmlFor="exampleInputImage">Image</label>
        <input type="file" className="form-control" name="image" onChange={e => uploadHandler(e)} id="exampleInputImage"/>
      </div>
      <div className="form-group ">
        <label htmlFor="exampleInputCountInStock">CountInStock</label>
        <input type="number" className="form-control" name="countInStock" value={countInStock} onChange={event => setCountInStock(event.target.value)} id="exampleInputCountInStock" required/>
      </div>
      <div className="form-group ">
        <label htmlFor="exampleInputDescription">Description</label>
        <input type="text" className="form-control" name="description" value={description} onChange={event => setDescription(event.target.value)} id="exampleInputDescription" required/>
      </div>
    <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
    {"  "}
    <button type="button"onClick={() => setModalVisible(false)} className="btn btn-warning">Back</button>
        </form>
        )}
  <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">CountInStock</th>
    </tr>
  </thead>
  <tbody>
  {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.countInStock}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => openModal(product)}>Edit</button>
                  {' '}
                  <button className="btn btn-danger"onClick={() => deleteHandler(product)}>Delete</button>
                </td>
              </tr>
            ))}
  </tbody>
  </table>
        </div>
    )
}


export default ProductScreen;