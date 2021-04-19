var btnAbrirPopup1 = document.getElementById('btn-abrir-popup1'),
  overlay1= document.getElementById('overlay1'),
  popup1= document.getElementById('popup1'),
  btnCerrarPopup1= document.getElementById('btn-cerrar-popup1');

btnAbrirPopup1.addEventListener('click' , function(){
  overlay1.classList.add('active1');
  popup1.classList.add('active1');
});

btnCerrarPopup1.addEventListener('click' , function(){
  overlay1.classList.remove('active1');
  popup1.classList.remove('active1');
});
