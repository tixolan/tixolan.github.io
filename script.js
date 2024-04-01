function cropSVG(svg) {
    var  bbox = svg.getBBox();
    svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
    svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
}

window.onload = () => { cropSVG(document.getElementById("tixo-logo"));  }