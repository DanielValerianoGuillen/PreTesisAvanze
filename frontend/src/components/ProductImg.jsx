const ProductImg = ({ product, index = 0, className = null }) => {


    if (!product.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'object-cover';
    }


    return (
        <img className={className} src={'http://localhost:4000/uploads/'+product.photos[index]} alt="" />
    );
}

export default ProductImg;