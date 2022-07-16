var mangNhanVien = [];


document.querySelector('#btnThemNV').onclick = function () {

    var nv = new NhanVien();
    console.log(nv)

    // lấy thông tin
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoVaTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    var ngayThang = document.querySelector('#datepicker').value;
    nv.ngayThang = moment(ngayThang).format('MM-DD-YYYY');
    nv.luongCB = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;


    var valid = true;

    valid &= kiemTraRong(nv.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nv.hoVaTen, '#tbTen', 'Họ và Tên') & kiemTraRong(nv.email, '#tbEmail', 'Email') & kiemTraRong(nv.matKhau, '#tbMatKhau', 'Mật khẩu') & kiemTraRong(nv.ngayThang, '#tbNgay', 'Ngày làm') & kiemTraRong(nv.luongCB, '#tbLuongCB', 'Lương cơ bản') & kiemTraRong(nv.gioLam, '#tbGiolam', 'Số giờ làm');

    valid &= kiemTraTatCaKyTu(nv.hoVaTen, '#hoVaTen_allLetter', 'Họ và tên') & kiemTraTatCaSo(nv.luongCB, '#tbLuongCB_allNumber', 'Lương cơ bản') & kiemTraTatCaSo(nv.gioLam, '#tbGiolam_allNumber', 'Số giờ làm') & kiemTraEmail(nv.email, '#error_email', 'Email');


    valid &= kiemTraDoDai(nv.taiKhoan, '#error_max_min_value_taiKhoan', 'Tài khoản', 4, 6);


    valid &= CheckPassword(nv.matKhau, '#error_max_min_value_matKhau', 'Mật khẩu');


    valid &= kiemTraGiaTri(nv.luongCB, '#tbLuongCB_value', 'Lương cơ bản', 1000000, 20000000) & kiemTraGiaTri(nv.gioLam, '#tbGiolam_time', 'Số giờ làm', 80, 200)
    valid &=checkChucVu(nv.chucVu,'#tbChucVu',"Chức vụ");




    if (!valid) {
        return;
    }


    mangNhanVien.push(nv);
    console.log('mangNhanVien', mangNhanVien);
    renderTableNhanVien(mangNhanVien);

}

function renderTableNhanVien(arrNhanVien) {
    var html = '';
    var html_btn = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nv = arrNhanVien[index];
        nv.tinhTongLuong = function () {
            var tongLuong = 0;
            if (nv.chucVu == 'Sếp') {
                tongLuong = nv.luongCB * 3;
            } else if (nv.chucVu == 'Trưởng phòng') {
                tongLuong = nv.luongCB * 2;
            } else if (nv.chucVu == 'Nhân viên') {
                tongLuong = nv.luongCB;
            }
            return tongLuong;
        }



        // tạo chuỗi html
        html += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoVaTen}</td>
            <td>${nv.email}</td>
            
            <td>${nv.ngayThang}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tinhTongLuong()}</td>
            <td>${nv.xepLoaiNV()}</td>
            <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan
            }')">Xoá</button>
                   
            </td>
        </tr>
        `;
    }

    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;

}

function xoaNhanVien(maNhanVienClick) {//3
    //hàm trong .findIndex sẽ tự động chạy đến khi nào tìm thấy hoặc hết mảng (không thấy thì trả về -1);
    var indexDel = mangNhanVien.findIndex(nv => nv.taiKhoan === maNhanVienClick);
    if (indexDel !== -1) {
        mangNhanVien.splice(indexDel, 1);
    }

    //Gọi hàm tạo lại table sau khi xoá
    renderTableNhanVien(mangNhanVien);
    // luuLocalStorage(mangSinhVien);
}


function capNhat(maNhanVienClick) {
    var indexUpdate = mangNhanVien.findIndex(nv => nv.taiKhoan === maNhanVienClick);
    var nvUpdate = mangNhanVien[indexUpdate];
    console.log('nvUpdate', nvUpdate);

    //Khoá lại tài khoản nhân viên
    document.querySelector('#taiKhoan').disabled = true;

    document.querySelector('#taiKhoan').value = nvUpdate.taiKhoan;
    document.querySelector('#hoVaTen').value = nvUpdate.hoVaTen;
    document.querySelector('#email').value = nvUpdate.email;
    document.querySelector('#matKhau').value = nvUpdate.matKhau;
    document.querySelector('#ngayThang').value = nvUpdate.ngayThang;
    document.querySelector('#luongCB').value = nvUpdate.luongCB;
    document.querySelector('#chucVu').value = nvUpdate.chucVu;
    document.querySelector('#gioLam').value = nvUpdate.gioLam;


}

document.querySelector('#btnCapNhat').onclick = function () {
    var nv = new NhanVien();
    console.log(nv)

    // lấy thông tin
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoVaTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    var ngayThang = document.querySelector('#datepicker').value;
    nv.ngayThang = moment(ngayThang).format('MM-DD-YYYY');
    nv.luongCB = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;


    var valid = true;

    valid &= kiemTraRong(nv.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nv.hoVaTen, '#tbTen', 'Họ và Tên') & kiemTraRong(nv.email, '#tbEmail', 'Email') & kiemTraRong(nv.matKhau, '#tbMatKhau', 'Mật khẩu') & kiemTraRong(nv.ngayThang, '#tbNgay', 'Ngày làm') & kiemTraRong(nv.luongCB, '#tbLuongCB', 'Lương cơ bản') & kiemTraRong(nv.gioLam, '#tbGiolam', 'Số giờ làm');

    valid &= kiemTraTatCaKyTu(nv.hoVaTen, '#hoVaTen_allLetter', 'Họ và tên') & kiemTraTatCaSo(nv.luongCB, '#tbLuongCB_allNumber', 'Lương cơ bản') & kiemTraTatCaSo(nv.gioLam, '#tbGiolam_allNumber', 'Số giờ làm') & kiemTraEmail(nv.email, '#error_email', 'Email');


    valid &= kiemTraDoDai(nv.taiKhoan, '#error_max_min_value_taiKhoan', 'Tài khoản', 4, 6);


    valid &= CheckPassword(nv.matKhau, '#error_max_min_value_matKhau', 'Mật khẩu');


    valid &= kiemTraGiaTri(nv.luongCB, '#tbLuongCB_value', 'Lương cơ bản', 1000000, 20000000) & kiemTraGiaTri(nv.gioLam, '#tbGiolam_time', 'Số giờ làm', 80, 200);

    valid &=checkChucVu(nv.chucVu,'#tbChucVu',"Chức vụ");

    if (!valid) {
        return;
    }



    var indexUpdate = mangNhanVien.findIndex(nhanVien => nhanVien.taiKhoan === nv.taiKhoan);


    mangNhanVien[indexUpdate].hoVaTen = nv.hoVaTen;
    mangNhanVien[indexUpdate].email = nv.email;
    mangNhanVien[indexUpdate].matKhau = nv.matKhau;
    mangNhanVien[indexUpdate].ngayThang = nv.ngayThang;
    mangNhanVien[indexUpdate].luongCB = nv.luongCB;
    mangNhanVien[indexUpdate].chucVu = nv.chucVu;
    mangNhanVien[indexUpdate].gioLam = nv.gioLam;


    renderTableNhanVien(mangNhanVien);

    document.querySelector('#taiKhoan').disabled = false;

}


document.querySelector('#btnTimNV').onclick = function () {
    // renderTableLoaiNV(mangNhanVien);

    // var htmlLoaiNV = '';
    // var loaiNV = document.querySelector('#searchName').value;
    // for (var index = 0; index < mangNhanVien.length; index++) {
    //     if (loaiNV == 'Sếp') {
    //         htmlLoaiNV += mangNhanVien[index];
    //     } else if (loaiNV == 'Trưởng phòng') {
    //         htmlLoaiNV += mangNhanVien[index];
    //     } else if (loaiNV == 'Nhân viên') {
    //         htmlLoaiNV += mangNhanVien[index];

    //     } else {
    //         htmlLoaiNV = 'Không tìm thấy nhân viên';
    //     }
    // }


    // document.querySelector('#tableDanhSach').innerHTML = htmlLoaiNV;
    // return htmlLoaiNV;


    // function renderTableLoaiNV(arrLoaiNV){

    //     var html_LoaiNV='';
    //     var loaiNV = document.querySelector('#searchName').value;
    //     for(var index = 0; index < arrLoaiNV.length; index++){
    //         // var nv = arrLoaiNV[index];
    //         // nv.xepLoaiNV = function(){
    //         //     var XL = '';
    //         //     var soGioLamViec = Number(this.gioLam);
    //         //     if(soGioLamViec>= 192){
    //         //         XL= 'Nhân viên xuất sắc'
    //         //     }else if(soGioLamViec >= 176){
    //         //         XL= 'Nhân viên giỏi'
    //         //     }else if(soGioLamViec >=160){
    //         //         XL= 'Nhân viên khá'
    //         //     }else if(soGioLamViec < 160){
    //         //         XL= 'Nhân viên trung bình'
    //         //     }
    //         //     return XL;
    //         // }
    //         if(loaiNV===xepLoaiNV){
    //             html_LoaiNV+= mangNhanVien[index];
    //         }




    //     }
    //      document.querySelector('#tableDanhSach').innerHTML = html_LoaiNV;
    //     return html_LoaiNV;

    // }

    var loaiNVCanTim = document.querySelector('#searchName').value;
    
    var html_LoaiNV = '';
    for (index = 0; index < mangNhanVien.length; index++) {
        console.log(mangNhanVien[index].xepLoaiNV())
        if (loaiNVCanTim == mangNhanVien[index].xepLoaiNV()) {
            html_LoaiNV += 
        `<tr>
            <td>${mangNhanVien[index].taiKhoan}</td>
            <td>${mangNhanVien[index].hoVaTen}</td>
            <td>${mangNhanVien[index].email}</td>
            <td>${mangNhanVien[index].ngayThang}</td>
            <td>${mangNhanVien[index].chucVu}</td>
            <td>${mangNhanVien[index].tinhTongLuong()}</td>
            <td>${mangNhanVien[index].xepLoaiNV()}</td>
        </tr>`
        ;
        }
    }
    document.querySelector('#tableDanhSach').innerHTML = html_LoaiNV;
    return html_LoaiNV;
}








