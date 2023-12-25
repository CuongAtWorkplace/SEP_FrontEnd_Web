import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../../paths";
const CardLessMoney = ({ closePopup }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [moneyAdd, setMoneyAdd] = useState('');


    
    useEffect(() =>{
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);
           
            if (Number(decodedToken.roleid) !== 4 || localStorage.getItem("token") === '') {
                navigate(`/`);
            }
        }else{

        }
    },[])
    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const money = {
            fromUser: decodedToken.userid,
            toUser: params.userId,
            totalMoney: moneyAdd,
            createDate: new Date().toISOString().slice(0, 16),
            type: false
        };

        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/Payment/LessPayment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(money)
            });
            if (response.ok) {
                // try {
                //     const response = await fetch(`${API_BASE_URL}/api/User/UpdateBalanceStudentPurchase/UpdateBalanceStudentPurchase/${moneyAdd}/${params.userId}`
                //     , {
                //         method: 'PUT'
                //     }); // Thay thế URL bằng API thực tế
    
                // if (response.ok) {
                //     window.location.reload();
                // }
                // const responseData = await response.json();
                // } catch (error) {
                //     console.error('Lỗi khi lấy dữ liệu lớp học:', error);
                // }
                console.log('Dữ liệu lớp học đã được cập nhật thành công');
                closePopup();
                window.location.reload();
            } else {
                console.error('Lỗi khi cập nhật dữ liệu lớp học:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu lớp học:', error);
        }
    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <h2>Add Money</h2>
                <div className="form-group">
                    <label className="control-label">Money (vnd) :</label>
                    <input class="form-control" type="number" min={0} id="moneyAdd" name="moneyAdd" value={moneyAdd} onChange={(e) => setMoneyAdd(e.target.value)} required />
                </div>
                <button type="submit" id="submit" name="submit" className="btn-btn">Less </button>
                <button type="button" onClick={closePopup} className="btn-  btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardLessMoney;