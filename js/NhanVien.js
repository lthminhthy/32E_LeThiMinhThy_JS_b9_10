function NhanVien() {
    this.taiKhoan = '';
    this.hoVaTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayThang = '';
    this.luongCB = '';
    this.chucVu = '';
    this.gioLam = '';
    

    this.xepLoaiNV = function(){
        var XL = '';
        var soGioLamViec = Number(this.gioLam);
        if(soGioLamViec>= 192){
            XL= 'Nhân viên xuất sắc'
        }else if(soGioLamViec >= 176){
            XL= 'Nhân viên giỏi'
        }else if(soGioLamViec >=160){
            XL= 'Nhân viên khá'
        }else if(soGioLamViec < 160){
            XL= 'Nhân viên trung bình'
        }
        return XL;
    }
}
