window.onload = function(){
    document.querySelector("#init").addEventListener("click", ReadElementsNumber);
    var elements = document.querySelectorAll(".item");

    elements.forEach(element => {
        element.addEventListener("touchstart", dragStart);
        element.addEventListener("touchmove", drag, false);
        element.addEventListener("touchend", dragEnd, false);
        
        element.addEventListener("mousedown", dragStart);
        element.addEventListener("mousemove", drag, false);
        element.addEventListener("mouseup", dragEnd, false);
    });

}

function ReadElementsNumber(){
    let nums = document.querySelector("#inpNumbers").value;
    
    var element = document.createElement("div");
    element.classList.add("item");
    var elements = [];
    var outerElement = document.querySelector(".container");
    for(var i = 0; i < nums; i++){
        elements.push(element.cloneNode(true));
        elements[elements.length - 1].addEventListener("touchstart", dragStart);
        elements[elements.length - 1].addEventListener("touchmove", drag, false);
        elements[elements.length - 1].addEventListener("touchend", dragEnd, false);
        
        elements[elements.length - 1].addEventListener("mousedown", dragStart);
        elements[elements.length - 1].addEventListener("mousemove", drag, false);
        elements[elements.length - 1].addEventListener("mouseup", dragEnd, false);
    }
    
    for(var i = 0; i < nums; i++){
        outerElement.appendChild(elements.pop());
    }
}

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var oofsetX = 0;
var oofsetY = 0;

function dragStart(e) {
 
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  } else {
    initialX = e.clientX;
    initialY = e.clientY;
  }

  let transformProp = e.target.style.transform;
  if(transformProp !== ""){
    let transofm = transformProp.slice(transformProp.indexOf("(") + 1, transformProp.length - 1  );
    [oofsetX, oofsetY] = transofm.split("px, ", 2);
    console.log(oofsetX, oofsetY);
  }  
    active = true;
    console.log("dragStart","active: ", active)
}
    
function drag(e) {
  if (active) {
    
    e.preventDefault();
    
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    currentX += +oofsetX;
    currentY += +oofsetY;

    console.log("drag","active: ", active)
    console.log("drag","e.clientX: ", e.clientX);
    console.log("drag","e.clientY: ", e.clientY);
    console.log("drag","currentX: ", currentX);
    console.log("drag","currentY: ", currentY);
    setTranslate(currentX, currentY, e.target);
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
  console.log("dragEnd",active)
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}