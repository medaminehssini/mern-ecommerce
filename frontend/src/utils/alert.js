import Swal from 'sweetalert2'


export const toastAlert = ({text , icon = 'success'}) => {

    Swal.fire({
        text: text,
        toast: true,
        position: 'top-right', 
        icon: icon 
    })
} 


export const sweetAlert = ({type , message , text}) => {

    Swal.fire({
        icon: type,
        title:message,
        text
    })

}

export const sweetBox = ({icon , type  , name  , title}  ) => {
    let color = "red";
    if(type && type.toLowerCase() === "success") {
        color = "green"
    }

    return Swal.fire({
        title,
        icon,
        showCancelButton: true,
        confirmButtonColor:color,
        confirmButtonText: name ,

    })

}