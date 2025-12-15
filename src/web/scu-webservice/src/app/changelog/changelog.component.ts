import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-changelog',
  imports: [HeaderComponent],
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {
  title = 'Changelog';
  html: SafeHtml = '';
  developers = environment.developers;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    try {
      const md = await firstValueFrom(
        this.http.get('/CHANGELOG.md', { responseType: 'text' })
      );

      const rawHtml = await marked.parse(md);

      this.html = this.sanitizer.bypassSecurityTrustHtml(rawHtml);

    } catch (err) {
      console.error('Fehler beim Laden des Changelogs:', err);
      this.html = '<p>Changelog konnte nicht geladen werden.</p>';
    }
  }
}