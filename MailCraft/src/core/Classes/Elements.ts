import type { IHtmlElement } from '../Interfaces';

export class TextElement implements IHtmlElement {
  private texto: string;

  constructor(texto: string) {
    this.texto = texto;
  }
  renderizar(): string {
    return `<p>${this.texto}</p>`;
  }
}

export class ImageElement implements IHtmlElement {
  private src: string;
  private alt: string;

  constructor(src: string, alt = '') {
    this.src = src;
    this.alt = alt;
  }
  renderizar(): string {
    return `<img src="${this.src}" alt="${this.alt}" />`;
  }
}

export class LinkElement implements IHtmlElement {
  private texto: string;
  private href: string;

  constructor(texto: string, href: string) {
    this.texto = texto;
    this.href = href;
  }
  renderizar(): string {
    return `<a href="${this.href}">${this.texto}</a>`;
  }
}

export class BodyComponent implements IHtmlElement {
  private children: IHtmlElement[] = [];

  add(elemento: IHtmlElement) {
    this.children.push(elemento);
  }

  remove(elemento: IHtmlElement) {
    this.children = this.children.filter(el => el !== elemento);
  }

  renderizar(): string {
    return this.children.map(el => el.renderizar()).join('\n');
  }
}
