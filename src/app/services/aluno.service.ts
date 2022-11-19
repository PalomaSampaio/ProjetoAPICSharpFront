import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/Aluno';

@Injectable()
export class AlunoService {
    elementApiUrl = 'https://localhost:7009/api/Aluno'
  constructor(private http: HttpClient) { }

  getElements(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.elementApiUrl);
  }

  createElements(element: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.elementApiUrl, element);
  }

  editElement(element: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(this.elementApiUrl, element);
  }

  deleteElement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}?id=${id}`);
  }
}