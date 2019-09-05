import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card;
  constructor(private httpClient: HttpClient){}
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private showSpinner: boolean;
  ngOnInit() {
  }

  onLike(card: any){
    this.showSpinner = true;
    const newCard = {id:card.id ,likes: card.likes+1};
    this.httpClient.put('/api/skills/'+card.id, newCard, {headers: this.headers}).subscribe( _ => {
      this.httpClient.get('/api/skills/'+card.id).subscribe(
        (data: {id: number,likes: number}) => {this.showSpinner = false,card.likes = data.likes}
      );
     });

 } 

  onShare(card: any){
    window.open("https://www.linkedin.com/in/julio-gurgel-28085151/", "_blank");
  }

}
