import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUsuario } from '../interfaces/IUsuario';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  logar(usuario: IUsuario): Observable<any> {
    /*return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
      tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['']);
      }));*/
    return this.mockUsuarioLogin(usuario).pipe(
      tap((resposta) => {
        if (!resposta.sucesso) return;
        sessionStorage.setItem(
          'token',
          btoa(JSON.stringify('TokenQueSeriaGeradoPelaAPI'))
        );
        sessionStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
        this.router.navigate(['']);
      })
    );
  }
  private mockUsuarioLogin(usuario: IUsuario): Observable<any> {
    var retornoMock: any = [];
    if (usuario.email === 'pedro@gmail.com' && usuario.senha == '123') {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = 'TokenQueSeriaGeradoPelaAPI';
      return of(retornoMock);
    }
    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }
  deslogar() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  /*get obterUsuarioLogado(): IUsuario {
    return sessionStorage.getItem('usuario')
      ? JSON.parse(atob(sessionStorage.getItem('usuario')))
      : null;
  }
  get obterIdUsuarioLogado(){
    return sessionStorage.getItem('usuario')
      ? (JSON.parse(atob(sessionStorage.getItem('usuario'))) as IUsuario).id
      : null;
  }
  get obterTokenUsuario(): string {
    return sessionStorage.getItem('token')
      ? JSON.parse(atob(sessionStorage.getItem('token')))
      : null;
  }*/
  get logado(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }
}
