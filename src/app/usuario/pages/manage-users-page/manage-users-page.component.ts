import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { UsuariosformComponent } from '../../components/usuariosform/usuariosform.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TiposUsuarios } from '../../interfaces/tipos-usuario.interface';
import { Analista } from '../../../sanitario/interfaces/analista.interface';
import { Medico } from '../../../sanitario/interfaces/medico.interface';
import { MedicoService } from '../../../sanitario/services/medico.service';
import { AnalistaService } from '../../../sanitario/services/analista.service';
import { forkJoin, map } from 'rxjs';




@Component({
    selector: 'app-usuario',
    imports: [UsuariosformComponent, ReactiveFormsModule, FormsModule],
    templateUrl: './manage-users-page.component.html'
})
export class ManageUsersPageComponent {


    usuarioService = inject(UsuarioService);
    MedicoService = inject(MedicoService);
    analistaService = inject(AnalistaService);
    busquedaSip:string = '';

    usuariosOfComponent: Usuario[] = [];
    medicosOfComponent: Medico[] =[];
    AnalistaOfComponent: Analista[] = [];
    tiposUsuariosOfComponent: TiposUsuarios[] = []

    fb = inject(FormBuilder)
    filtroForm = this.fb.group({sip: ['']})

    usuarioSelected: Usuario = {
        usuarioId:-1,
        nombre:'',
        apellidos:'',
        fechaNacimiento: '',
        sexo:'M',
        sip:'',
        dni:'',
        direccion:'',
        codigoPostal:'',
        email:'',
        telefono:'',
        contrasenya:'',
        fechaRegistro: new Date(),
    }

  public ngOnInit(): void {
    this.filtroForm.get('sip')!.valueChanges.subscribe(sip => {
      this.busquedaSip = (sip || '').toUpperCase();
      this.actualizarLista();
    });
  }

  public actualizarLista():void {
    forkJoin({
      usuarios: this.usuarioService.findAll(),
      medicos: this.MedicoService.findAll(),
      analistas: this.analistaService.findAll()
    }).subscribe(({ usuarios, medicos, analistas }) => {

    this.usuariosOfComponent = usuarios.filter(u =>
      u.sip.toUpperCase().includes(this.busquedaSip)
    );

    this.tiposUsuariosOfComponent = this.usuariosOfComponent.map(u => ({
        usuario: u,
        actividadMedico: medicos.some(m => m.usuarioId === u.usuarioId),
        actividadAnalista: analistas.some(a => a.usuarioId === u.usuarioId)
      }));
    });
  }

  public cambiarPerfil(usuarioFila: TiposUsuarios, actividad: string, checked: boolean) {
    if (actividad === 'medico' && checked) {
      this.MedicoService.save(usuarioFila.usuario as Medico).subscribe();
      if(usuarioFila.actividadAnalista){
        usuarioFila.actividadAnalista = false;
      }
    } else if (actividad === 'analista' && checked) {
      this.analistaService.save(usuarioFila.usuario as Analista).subscribe();
      if(usuarioFila.actividadMedico){
        usuarioFila.actividadMedico = false;
      }
    } else if (actividad === 'medico' && !checked){
      this.MedicoService.delete(usuarioFila.usuario.usuarioId!).subscribe();
    } else if (actividad === 'analista' && !checked){
      this.analistaService.delete(usuarioFila.usuario.usuarioId!).subscribe();
    }
  }

    public actualizarUsuario(usuarioFila: Usuario):void {
      this.usuarioSelected = {...usuarioFila};
    }

    public anyadirUsuario(usuarioForm: Usuario):void {
      if(usuarioForm.usuarioId===-1){
        this.usuarioService.save(usuarioForm).subscribe({
           next: (resp: HttpResponse<Usuario>) => {
              if (resp.status === 201 && resp.body) {
                alert('Usuario creado correctamente!');
                this.actualizarLista();
              }
            },
            error: (err: HttpErrorResponse) => {
               const mensajes = Object.values(err.error as Record<string,string>).join('\n');
               alert(`Error:\n${mensajes}`);
            }
          });
      }
      else {
      this.usuarioService.update(usuarioForm).subscribe({
           next: (resp: HttpResponse<Usuario>) => {
              if (resp.status === 200 && resp.body) {
                alert('¡Usuario actualizado correctamente!');
                this.actualizarLista();
                this.limpiarFormulario();
              }
            },
            error: (err: HttpErrorResponse) => {
               const mensajes = Object.values(err.error as Record<string,string>).join('\n');
               alert(`Error:\n${mensajes}`);
            }
      });
    }
    }

    public eliminarUsuario(id: number) {
        this.usuarioService.delete(id).subscribe({
           next: (resp: HttpResponse<Usuario>) => {
              if (resp.status === 200 && resp.body) {
                alert('¡Usuario eliminado correctamente!');
                this.actualizarLista();
              }
            },
            error: (err: HttpErrorResponse) => {
               const mensajes = Object.values(err.error as Record<string,string>).join('\n');
               alert(`Error:\n${mensajes}`);
            }
      });
    }

    private limpiarFormulario() {
      this.usuarioSelected= {
        usuarioId:-1,
        nombre:'',
        apellidos:'',
        fechaNacimiento: '',
        sexo:'M',
        sip:'',
        dni:'',
        direccion:'',
        codigoPostal:'',
        email:'',
        telefono:'',
        contrasenya:'',
        fechaRegistro: new Date(),
      }
    }
}
