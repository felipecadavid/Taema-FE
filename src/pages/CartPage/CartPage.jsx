import { useSelector } from 'react-redux';

function CartPage(){
    const cart = useSelector(state => state.cart);

    console.log(cart);

    return(
        <div>:D</div>
    )
}

export default CartPage;