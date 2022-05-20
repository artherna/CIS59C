let wineries = [{ name: 'Boa Ventura De Caires Winery', lat: 37.6622242, lng: -121.6751873 }, { name: '3 Steves Winery', lat: 37.6485433, lng: -121.694541 },
{ name: 'Bodegas Aguirre Winery', lat: 37.6670238, lng: -121.6890554 }, { name: 'Charles R Vineyards', lat: 37.6449445, lng: -121.6933311 },
{ name: 'Bent Creek Winery', lat: 37.6500151, lng: -121.7021226 }, { name: 'Caddis Winery', lat: 37.6542616, lng: -121.6976399 },
{ name: 'Arroyo Cellars', lat: 37.6764002, lng: -121.7213251 }, { name: 'Big White House Winery and John Evan Cellars', lat: 37.64711, lng: -121.6957399 },
{ name: 'Cedar Mountain Winery', lat: 37.6612418, lng: -121.6588128 }, { name: 'Almost Famous Wine', lat: 37.6760742, lng: -121.7193931 },
{ name: 'Ehrenberg Cellars', lat: 37.6972639, lng: -121.8154042 }, { name: 'Concannon Vineyard', lat: 37.6670827, lng: -121.7397954 },
{ name: 'Darcie Kent Vineyards', lat: 37.6659675, lng: -121.7061218 }, { name: 'Cuda Ridge Wines', lat: 37.6547921, lng: -121.7668362 },
{ name: 'Del Valle Winery', lat: 37.6658241, lng: -121.7336671 }, { name: 'Eagle Ridge Vineyard', lat: 37.653502, lng: -121.672361 },
{ name: 'Favalora Vineyards Winery', lat: 37.6764357, lng: -121.7191618 }, { name: 'El Sol Winery', lat: 37.6879021, lng: -121.6875288 },
{ name: 'Stony Ridge Winery', lat: 37.649511, lng: -121.696887 }, { name: 'Dante Robere Vineyards', lat: 37.6456844, lng: -121.7821115 },
{ name: 'Fenestra Winery', lat: 37.6418073, lng: -121.7959684 }, { name: 'Mitchell Katz Winery', lat: 37.666449, lng: -121.719954 },
{ name: 'McGrail Vineyards and Winery', lat: 37.6503411, lng: -121.6950897 }, { name: 'Longevity Wines Inc', lat: 37.6759437, lng: -121.7192298 },
{ name: 'Las Positas Vineyards', lat: 37.6458024, lng: -121.7704979 }, { name: 'Leisure Street Winery', lat: 37.66257, lng: -121.683039 },
{ name: 'Nottingham Cellars', lat: 37.6765212, lng: -121.7192675 }, { name: "Murrieta's Well", lat: 37.659, lng: -121.73449 },
{ name: 'Garre Vineyard Restaurant & Event Center', lat: 37.6657331, lng: -121.6979142 }, { name: 'Rios-Lovell Winery', lat: 37.6663853, lng: -121.7145094 },
{ name: 'Rodrigue Molyneaux Winery', lat: 37.6544685, lng: -121.7573462 }, { name: 'Rosa Fierro Cellars', lat: 37.6764, lng: -121.7193616 },
{ name: 'Omega Road Winery', lat: 37.6772196, lng: -121.7194014 }, { name: 'Retzlaff Vineyards', lat: 37.6724055, lng: -121.7532201 },
{ name: 'Occasio Winery', lat: 37.6764513, lng: -121.7195675 }, { name: 'The Singing Winemaker', lat: 37.6649648, lng: -121.731373 },
{ name: 'Paulsen Wines', lat: 37.6646371, lng: -121.7310154 }, { name: 'The Lineage Wine Collection', lat: 37.664289, lng: -121.728086 },
{ name: 'Page Mill Winery', lat: 37.6691513, lng: -121.7459135 }, { name: 'Wente Vineyards Tasting Lounge', lat: 37.6233946, lng: -121.7560431 },
{ name: 'Wood Family Vineyards', lat: 37.6753661, lng: -121.7200067 }];

let favorites = []
let reservations = []

var sortWinery = function() {
    wineries.sort(function(a, b) {
        if (a.name.toLocaleLowerCase() == b.name.toLocaleLowerCase()) {return 0}
        var orderBool = a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase();
        return orderBool ? 1 : -1;
      });
};

var deleteFavorite = function(value){
    for(var i =0;i<favorites.length;i++){
        if (favorites[i] == value){
            favorites.splice(i,1);
            break;
        }
    }
    setStorage("favorite_wineries", favorites);
}

var $ = function (id) {
    return document.getElementById(id);
}