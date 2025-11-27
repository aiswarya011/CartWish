
import { useNavigate } from "react-router-dom";
import './OrderPlaced.css'
import Table from "../common/Table";
import UseData from "../../Hooks/UseData";
import CircleLoader from "react-spinners/CircleLoader";

const OrderPlaced = () => {
    const navigate = useNavigate();

    const { data: orders, isLoading } = UseData("/order");

    const getProductString = (order) => {
        if (!order?.products?.length) return "No products";
        return order.products
            .map(p => {
                const title = p?.product?.title ?? "Unknown";
                const qty = p?.quantity ?? 0;
                return `${title} (${qty})`;
            })
            .join(", ");
    };

    if (!orders || orders.length === 0) {
        return (
            <>
                <em style={{ display: "block", textAlign: "center", marginTop: "30px" }}>
                    <h2>My Orders</h2>
                    You have not yet placed an order.
                </em>
            </>
        );
    }


    return (
        <section className="order_success_container order_section">
            {/* loader overlay */}
            {isLoading && (
                <div className="loader_overlay">
                    <CircleLoader />
                </div>
            )}

            <h2>My Orders</h2>
            {/* {orders?.length === 0 && (
                <em style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                    You have not yet placed an order.
                </em>
            )} */}


            {orders.length > 0 &&
                <>

                    <p>Your order has been placed successfully.</p>
                    <p>A delivery agent will reach you shortly.</p>
                    <Table headings={["Order", "Products", "Total", "Status"]}>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id ?? index}>
                                    <td>{index + 1}</td>
                                    <td>{getProductString(order)}</td>
                                    <td>${order?.total}</td>
                                    <td>{order?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <button
                        className="search_button"
                        type="submit"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                </>

            }


        </section>
    );
};

export default OrderPlaced;
