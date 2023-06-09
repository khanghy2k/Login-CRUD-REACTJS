import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[
               { 
                id:1,
                username:'admin',
                email:'admin@gmail.com',
                phone : '12093812',
                password : '1234'
               },
               {
                id:2,
                username:'customer',
                email:'customer@gmail.com',
                phone : '1209381222',
                password : '123411'
               }

            ],
            values:{
               
            }
        }
    }
  
    handleChange =(event) => {
        this.setState((prevState) => ({
            values:{...prevState.values,[event.target.name]:event.target.value}
    
        }));
    }

    btnAddNew = () => {
          let newUser = this.state.values;  
          if(newUser.password !== newUser.confirm){
            alert('Mậu khẩu không khớp');
            return;
          }
          newUser.id = this.state.users.length + 1;
          this.setState(prevState=>({
            users:[...prevState.users,newUser],
            values:{}
          }));
          console.log(this.state.values);
    }  

    btnEdit = (userEdit) => {
            this.setState({
                values:userEdit
            });
    }

    btnSave = () => {
        let _userInit = this.state.values;
        this.setState(prevState => ({
            users:prevState.users.map(u=>{
                if(u.id === _userInit.id) {
                    u.username = _userInit.username;
                    u.email = _userInit.email;
                    u.phone = _userInit.phone;
                    u.password = _userInit.password;
                }
                return u;
            })
        }));
    }

    btnDelete(userId) {
        this.setState(prevState =>({
            users:prevState.users.filter(user => user.id !== userId)
        }));
        console.log("Người dùng đã bị xóa!");
    }

    render() {
        return (
            <div className='user-form'>
                <form action="">
                    <fieldset>
                        <legend>Thông tin tài khoản</legend>
                        <input  onChange={this.handleChange} name='id' type="hidden" />
                        <p><b>Tên tài khoản</b> <input value={this.state.values.username || ''} onChange={this.handleChange} name='username' type="text" /></p>
                        <p><b>Email</b><input value={this.state.values.email || ''} onChange={this.handleChange} name='email'  type="text"  /></p>
                        <p><b>Số điện thoại</b><input value={this.state.values.phone || ''} onChange={this.handleChange} name='phone'  type="text" /></p>
                        <p><b>Mật khẩu</b><input value={this.state.values.password || ''}  onChange={this.handleChange}  name='password'   type="text" /></p>
                        <p><b>Xác nhận mật khẩu</b><input value={this.state.values.confirm || ''} onChange={this.handleChange} name='confirm' type="password" /></p>

                        <p>
                            <button type='button' className='btn btn-success' onClick={this.btnAddNew}  >Tạo mới</button>
                            <button className='btn btn-primary' onClick={this.btnSave} type='button'>Lưu</button>

                        </p>
                    </fieldset>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Tên tài khoản</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(u=>{
                            return <tr key = {u.id}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td> <button className="btn btn-warning" onClick={(e)=> {
                                    console.log("CLicked!");
                                    this.btnEdit(u);

                            }}>Sửa</button>
                                <button className="btn btn-danger" onClick={(e) =>{
                                    this.btnDelete(u.id);
                                }}>Xóa</button></td>
                            </tr>
                        })
                    }
                      
                    </tbody>
                </table>
            </div>
        );
    }
}
