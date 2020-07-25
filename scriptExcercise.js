// ACTION ON WEBPAGE
// 1. Type the keyword and click Search Button
$(".search-button").on("click", function () {
  searchMovie();
});

// 2. Type the keyword and push Enter key on keyboard
$(".input-keyword").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

// FUNCTIONS
// 1. Function to search movie by connecting to API
function searchMovie() {
  $.ajax({
    url:
      "https://www.omdbapi.com/?apikey=a2a531cf&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      // loop setiap elemen (m) pada movies lalu ditumpuk di variable cards
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      // ketika tombol detail diklik
      $(".modal-detail-button").on("click", function () {
        //   console.log($(this).data("imdbid")); // cek apakah imdbid nya keambil atau tidak
        $.ajax({
          url:
            "https://www.omdbapi.com/?apikey=a2a531cf&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showMovieDetail(m);
            $(".modal-body").html(movieDetail); //html manipulation, replace with the content based on api
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
}

// 2. Function to display the api data by manipulating html element
function showCards(m) {
  return `<div class="col-md-4 my-3">
            <div class="card">
                <img class="card-img-top" src="${m.Poster}" alt="" />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
                    data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
            </div>
        </div>`;
}

// 3. Function to display the api data (show detail) by manipulating html element
function showMovieDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" alt="" class="img-fluid" />
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item">
                                <strong>Director : </strong> ${m.Director}
                            </li>
                            <li class="list-group-item">
                                <strong>Actor : </strong> ${m.Actors}
                            </li>
                            <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// s --> tampilnya sedikit (dengan judul); i --> tampilnya lebih banyak (dengan imdbid)
// STEP 1: dengan function ini, data api sudah bisa diambil
// $.ajax({
//   url: "http://www.omdbapi.com/?apikey=a2a531cf&s=avengers",
//   success: results => {
//     console.log(results);
//   },
//   error: e => {
//     console.log(e.responseText);
//   }
// });
//
// STEP 2: mengulang elemen pada variable movies lalu ditempelkan pada elemen html cards
// $.ajax({
//     url: "http://www.omdbapi.com/?apikey=a2a531cf&s=avengers",
//     success: results => {
//       const movies = results.Search;
//       let cards = "";
//       // loop setiap elemen (m) pada movies lalu ditumpuk di variable cards
//       movies.forEach(m => {
//         cards += `<div class="col-md-4 my-3">
//                       <div class="card">
//                           <img class="card-img-top" src="" alt="" />
//                           <div class="card-body">
//                           <h5 class="card-title">Avengers</h5>
//                           <h6 class="card-subtitle mb-2 text-muted">2011</h6>
//                           <a href="#" class="btn btn-primary">Show Details</a>
//                           </div>
//                       </div>
//                   </div>`;
//       });
//       $(".movie-container").html(cards); //--> pada html nya, bagian div='row' ditempeli class movie-container supaya bisa dimanipulasi
//     },
//     error: e => {
//       console.log(e.responseText);
//     }
//   });
//
// STEP 3: setiap data yang ingin dimunculkan diganti dengan ${m.NamaKey}
// movies.forEach(m => {
//     cards += `<div class="col-md-4 my-3">
//                   <div class="card">
//                       <img class="card-img-top" src="${m.Poster}" alt="" />
//                       <div class="card-body">
//                       <h5 class="card-title">${m.Title}</h5>
//                       <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
//                       <a href="#" class="btn btn-primary">Show Details</a>
//                       </div>
//                   </div>
//               </div>`;
//   });
//
// STEP 4: membuat detail button
// html part -> memakai list group
/* <div
      class="modal fade"
      id="movieDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="movieDetailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="movieDetailModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> */

// script part
// ketika tombol detail diklik
// $(".modal-detail-button").on("click", function() {
//     //   console.log($(this).data("imdbid")); // cek apakah imdbid nya keambil atau tidak
//     $.ajax({
//       url:
//         "http://www.omdbapi.com/?apikey=a2a531cf&i=" + $(this).data("imdbid"),
//       success: m => {
//         const movieDetail = `<div class="container-fluid">
//                                   <div class="row">
//                                       <div class="col-md-3">
//                                           <img src="${m.Poster}" alt="" class="img-fluid" />
//                                       </div>
//                                       <div class="col-md">
//                                           <ul class="list-group">
//                                               <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
//                                               <li class="list-group-item">
//                                                   <strong>Director : </strong> ${m.Director}
//                                               </li>
//                                               <li class="list-group-item">
//                                                   <strong>Actor : </strong> ${m.Actors}
//                                               </li>
//                                               <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
//                                               <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
//                                           </ul>
//                                       </div>
//                                   </div>
//                               </div>`;
//         $(".modal-body").html(movieDetail); //html manipulation, replace with the content based on api
//       },
//       error: e => {
//         console.log(e.responseText);
//       }
//     });
//   });

// STEP 5: mengubah dom manipulation ke dalam function
// Functions to manipulate html
// function showCards(m) {
//     return `<div class="col-md-4 my-3">
//               <div class="card">
//                   <img class="card-img-top" src="${m.Poster}" alt="" />
//                   <div class="card-body">
//                       <h5 class="card-title">${m.Title}</h5>
//                       <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
//                       <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
//                       data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
//                   </div>
//               </div>
//           </div>`;
//   }

//   function showMovieDetail(m) {
//     return `<div class="container-fluid">
//                   <div class="row">
//                       <div class="col-md-3">
//                           <img src="${m.Poster}" alt="" class="img-fluid" />
//                       </div>
//                       <div class="col-md">
//                           <ul class="list-group">
//                               <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
//                               <li class="list-group-item">
//                                   <strong>Director : </strong> ${m.Director}
//                               </li>
//                               <li class="list-group-item">
//                                   <strong>Actor : </strong> ${m.Actors}
//                               </li>
//                               <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
//                               <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
//                           </ul>
//                       </div>
//                   </div>
//               </div>`;
//   }

//STEP 6: membuat kolom pencarian
// {
/* <div class="row">
        <div class="col-md-8">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control input-keyword"
              placeholder="Search Movie."
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div> */
// }

// STEP 7: membuat kolom pencarian
// $(".search-button").on("click", function() {
// bagian ini diisi dengan semua code yang diperlukan
// }
