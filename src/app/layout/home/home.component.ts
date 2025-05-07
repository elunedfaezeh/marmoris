import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FaqComponent } from './faq/faq.component';
import { CommentsComponent } from './comments/comments.component';
import { NewsComponent } from './news/news.component';
import { WebsitesComponent } from './websites/websites.component';
import { ArticleComponent } from './article/article.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ServiceComponent } from './service/service.component';
import { AppComponent } from './app/app.component';
import { ArticleInfoComponent } from './article-info/article-info.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,CommentsComponent,ArticleInfoComponent,ServiceComponent,AppComponent,GalleryComponent,ArticleComponent,NewsComponent,WebsitesComponent,FaqComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
