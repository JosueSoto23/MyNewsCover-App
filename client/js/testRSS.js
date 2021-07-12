fetch("https://cors-anywhere.herokuapp.com/https://www.elperiodico.com/es/rss/internacional/rss.xml")
    .then((response) => {
        response.text().then((xml) => {
            xmlContent = xml;
            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
            let books = xmlDOM.querySelectorAll("item")

            let html = `<div class="card-columns">`;
            books.forEach((element, i) => {
            console.log(element);
                let titulo = element.children[1].innerHTML;
                let tituloArreglado = titulo.slice(9, -3);

                let link = element.children[2].innerHTML;
                let linkArreglado = link.slice(9, -3);

                let fecha = element.children[3].innerHTML

                let descripcion = element.children[4].innerHTML;
                let descripcionArreglada = descripcion.slice(9, -3);

                html += `<div class="card mb-3">
				<div class="card-body">
					<p class="card-text">${fecha}</p>
				</div> 
				<div class="card-body">
					<h5 class="card-title">${tituloArreglado}</h5>
					<p class="card-text">${descripcionArreglada}</p>
					<h6 class="card-title">

					</h6>

				</div>
				<div class="card-footer">
					<a href="${linkArreglado}" class="card-link">Ver Noticia</a>
				</div>
                </div>
			`;
                i++;
                if (i >= 16) {

                }
            });
            html += `</div>`;
            document.getElementById("cards").innerHTML = html
        })
    });
