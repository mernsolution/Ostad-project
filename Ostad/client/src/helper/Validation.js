const mobileRegex= /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
const EmailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/


class Helper{
    isEmpty(value){
        if(value.length === 0){
            return true;
        }else{
            return false;
        }     
    }
    isMpbile(value){
        return mobileRegex.test(value)
    }

    isEmail(value){
        return !EmailRegex.test(value)
    }
    //  checkFileSize(file) {
    //     const MAX_SIZE = 10 * 1024 * 1024; // 5 MB
    //     if (file.size > MAX_SIZE){
    //       return false;
    //     }
    //     return true;
    //   }
}  



export  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
export const {isEmpty,isMpbile,isEmail}= new Helper();
  




