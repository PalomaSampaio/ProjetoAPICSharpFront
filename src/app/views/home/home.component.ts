import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Aluno } from 'src/app/models/Aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AlunoService]
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'matricula', 'telefone', 'email', 'Editar/Excluir'];
  dataSource!: Aluno[];

  constructor(
    public dialog: MatDialog,
    public alunoService: AlunoService
    ) {
      this.alunoService.getElements()
      .subscribe((data: Aluno[]) => {
        this.dataSource = data;
      });
    }

  ngOnInit(): void {
  }

  openDialog(element: Aluno | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        nome: '',
        matricula: null,
        telefone: null,
        email: '',
      } : {
        id: element.id,
        nome: element.nome,
        matricula: element.matricula,
        telefone: element.telefone,
        email: element.email,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.alunoService.editElement(result)
          .subscribe((data: Aluno) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
          this.dataSource[index] = data;
          this.table.renderRows();
          });
        } else {
          this.alunoService.createElements(result)
          .subscribe((data: Aluno) => {
          this.dataSource.push(data);
          this.table.renderRows();
          });
          
        }
      }
    }); 
  }

  editElement(element: Aluno): void {
    this.openDialog(element);
  }

  deleteElement(id: number): void {
    this.alunoService.deleteElement(id)
    .subscribe(() => {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
    });
  }
}

