AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "places-list" },
    selectedCard: { type: "string", default: "#card1" },
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
    
  },
  tick: function () {
    const { state } = this.el.getAttribute("tour")
    if (state === "view") {
      this.hideEL([this.placesContainer])
      this.showView();
    }
  },
  hideEL: function (elList) {
    elList.map(el => {
      el.setAttribute("visible", false)
    })
  },
  showView: function () {
    const { selectedCard } = this.data
    const skyEl = document.querySelector("#main-container")
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/images.jpg`,
      color: "white"
    })
  },
  createCards: function () {
    const thumbNailsRef = [
      {
        id: "spider_man",
        title: "Spider Man",
        url: "./assets/thumbnails/spider_man.jpg",
      },
      {
        id: "superman",
        title: "Superman",
        url: "./assets/thumbnails/superman.jpg",
      },

      {
        id: "xmen",
        title: "X-MEN",
        url: "./assets/thumbnails/xmen.jpg",
      },
      {
        id: "infinity_gauntlet",
        title: "Infinty Gauntlet",
        url: "./assets/thumbnails/infinity_gauntlet.jpg",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEL=this.createBorder(position,item.id)
      // Thumbnail Element
      const thumbnailEL = this.createThumbnail(item)
      borderEL.appendChild(thumbnailEL)
      // Title Text Element
      const titleEL=this.createTitle(position,item)
      borderEL.appendChild(titleEL)
      this.placesContainer.appendChild(borderEL);
    }
  },

  createBorder:function(pos,id){
    const entityEL = document.createElement("a-entity");
    entityEL.setAttribute("id",id);
    entityEL.setAttribute("visible",true);
    entityEL.setAttribute("geometry",{primitive:"plane",height:30,width:22});
    
    entityEL.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});
    entityEL.setAttribute("material",{color:"black",opacity:1});
    entityEL.setAttribute("cursor-listener",{});
    return entityEL
  },

  createThumbnail: function (item) {
    const entityEL = document.createElement("a-entity");
    entityEL.setAttribute("visible", true);
    entityEL.setAttribute("geometry", { primitive: "plane", height: 28, width: 20 });
    entityEL.setAttribute("position", { x: 0, y: 0, z: 0.1 });
    entityEL.setAttribute("material", {src:item.url});
    return entityEL
  },
  createTitle: function (pos, item) {
    const entityEL = document.createElement("a-entity");
    entityEL.setAttribute("text",{
      font:"exo2bold",
      align:"center",
      width:70,
      color:"black",
      value:item.title
    })
    const ELposition=pos
    ELposition.y-=40
    entityEL.setAttribute("visible", true);
    entityEL.setAttribute("position", ELposition);
    return entityEL
  },
});


AFRAME.registerComponent('cursor-listener', {
  schema: {
    selectedItemID: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnterEvent()
    this.handleMouseLeaveEvent()
    this.handleClickEvent()
  },
  handleClickEvent: function () {
    this.el.addEventListener("click", evt => {
      const placeContainer = document.querySelector("#comic-container")
      const { state } = placeContainer.getAttribute("tour")
      if (state === "places-list") {
        const id = this.el.getAttribute("id")
        const placeId = ["spider_man", "superman", "xmen", "infinity_gauntlet"]
        if (placeId.includes(id)) {
          placeContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id
          })
        }
      }
    })
  },
  handlePlacesListState: function () {
    const id = this.el.getAttribute("id")
    const placeID = ["spider_man", "superman", "xmen", "infinity_gauntlet"]
    if (placeID.includes(id)) {
      const placeContainer = document.querySelector("#comic-container")
      placeContainer.setAttribute("cursor-listener", {
        selectedItemID: id,
      })
      this.el.setAttribute("material", { color: "orange", opacity: 1 })
    }
  },
  handleMouseEnterEvent: function () {
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    })
  },
  handleMouseLeaveEvent: function () {
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemID } = this.data
      if (selectedItemID) {
        const el = document.querySelector(`#${selectedItemID}`)
        const id = el.getAttribute("id")
        if (id === selectedItemID) {
          el.setAttribute("material", { color: "black", opacity: 1 })
        }
      }
    })
  },
});