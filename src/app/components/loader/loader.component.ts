import { Component } from '@angular/core';
import { LoaderService } from '../../services/managers/loader.service';

@Component({
  selector: 'loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  public active :boolean = true;
  public message: string = 'Cargando...';

  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.loader$.subscribe(
      res => {
        if(res == null){
          this.active = false;
          this.message= 'Cargando...';
          return;
        }

        this.active = true
        this.message = res.message;
      }
    )
  }
}
