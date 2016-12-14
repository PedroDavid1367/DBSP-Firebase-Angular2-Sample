import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseListFactory,
         AuthProviders, AuthMethods } from 'angularfire2';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'app works!';
  public movies: FirebaseListObservable<any[]>;
  public favMovie: FirebaseObjectObservable<any>;
  public favouriteMovie: string;
  public allMovies: FirebaseObjectObservable<any>;
  //public favouriteMovieToSet: FirebaseObjectObservable<any>;
  public favouriteMovieToUpdate: FirebaseObjectObservable<any>;
  public favouriteMovieToRemove: string;

  public constructor (public _af: AngularFire) {
    _af.auth.subscribe(auth => console.log("The auth: " + auth));

    //this.movies = _af.database.list('/movies');
    this.movies = _af.database.list('/movies', {
      query: {
        limitToFirst: 2,
        orderByKey: true
      }});

    this.favMovie = _af.database.object("/favouriteMovie");
    _af.database.object("/movies/m1")
      .subscribe(obj => {
        this.favouriteMovie = obj.$value;
      });
    _af.database.object("/movies")
      .subscribe(movies => console.log(movies));
    // _af.database.object("/favouriteMovie")
    //   .set({nombre: "Pulp fiction", name: "Pulp fiction"});
    _af.database.object("/favouriteMovie")
      .update({something: "Some movie"});
    _af.database.object("/favouriteMovie/nombre")
      .remove()
      .then(removedMovie => { 
        this.favouriteMovieToRemove = "Item removed!!!";
        console.log(this.favouriteMovieToRemove);
        console.log("Showing removedMovie: " + removedMovie);
      })
      .catch(error => {
        console.log(this.favouriteMovieToRemove);
        this.favouriteMovieToRemove = "The item does not exist or was already removed";
      }); 

    this.reference = new Subject();
    _af.database.list("/similarItems", {
      query: {
        orderByChild: "si",
        equalTo: this.reference
      }
    }).subscribe(similarItems => this.similarItems = similarItems);
  }

  public updateMovies () {
    //this.movies.push("Star Wars II");
    //this.movies.update("-KX0YW6PuycyebkSmg_w", {name: "Star Wars VII"});
    //this.movies.remove("-KX0YW6PuycyebkSmg_w");
    // this._af.database.list("similarItems").push({name: "Pedro", code: 1});
    // this._af.database.list("similarItems").push({name: "David", code: 2});
    // this._af.database.list("similarItems").push({age: 571, id: 1337});
    // this._af.database.list("similarItems").push({age: 67, id: 1313});
    //this._af.database.list("similarItems").remove("eg");
  }

  public filter (value: number) {
    this.reference.next(value);
  }

  public login () {
    this._af.auth.login({
      email: 'pedro_571_david@hotmail.com',
      password: 'David571',
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
  }

  public logout () {
    this._af.auth.logout();
  }

  public addUser () {
    // Lets say that the user has set up a username, password and email.
    var username = "Pedro David";
    var password = "David571";
    var email = "p3@p3.com";  
    this._af.auth.createUser(
      {
        email: email, 
        password: password
      }
    )
    .then(auth => {
      console.log(auth);
      this._af.auth.login({
        email: auth.auth.email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      })
      .then(auth => {
        this._af.database.object(`/users/${auth.uid}`)
          .set({
            username: username,
            password: password,
            email: email 
          });
      })
      .catch(err => console.log(err));  
    })
    .catch(err => console.log(err));
  }

  public changeUsername () {
    // this._af.auth.subscribe(auth => {
    //   auth.auth.displayName = "Pedro David Fuentes Antezana";
    // });
    this._af.auth.subscribe(auth => {
      this._af.database.object(`/users/${auth.uid}`)
        .update({
          username: "Pedro David Fuentes Antezana"
        });
    });
  }

  public getUsername () {
    // this._af.auth.subscribe(auth => {
    //   console.log(auth.auth.displayName);
    // });
    this._af.auth.subscribe(auth => {
      this._af.database.object(`/users/${auth.uid}`)
        .subscribe(obj => {
          console.log(obj.username);
        });
    });
  }

  public addNewMovie () {
    // this._af.database.object("/movies")
    //   .update({name: "eg!"})
    //   .catch(err => console.log("Error on method addNewMovie() " + err));
    console.log("The auth object:");
    console.log(this._af.auth.subscribe(userAuth => console.log(userAuth)));
  }

  public similarItems;
  private reference: Subject<any>;
}
