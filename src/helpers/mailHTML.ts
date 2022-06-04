export const mailHTML = <T>(url: T, type: T) => {
  return `
    <div>
    <style type= text/css >
      div {
        padding: 2rem;
        display: flex;
        flex-direction:column;
        background:#19202A;
        color: white;
      }
      h1:{
        font-size:3rem;
      }
      p{
        font-size: 1rem;
      }
      a{
        height: 45px;
        width: 160px;
        display:flex;
        align-items:center;
        justify-content:center;
        background: none;
        padding:0.5rem 1rem;
        font-size: 1rem;
        font-weight:bold;
        color:white;
        border: 3px #E7E8EA solid;
        border-radius: 7px;
        text-decoration: none;
        transition: all .2s ease-in-out;
      }
      a:hover{
        transform: scale(1.2);
        background: #E7E8EA;
        color:#19202A
      }
      a:active{
        transform: scale(0.9);
      }
    </style>
    <h1>Thank you for Registering with <strong>Tutornia</strong></h1>
    <p>Kindly click the button below to procced</p>
    <a href="${url}">${type}</a>
    </div>
    `;
};
