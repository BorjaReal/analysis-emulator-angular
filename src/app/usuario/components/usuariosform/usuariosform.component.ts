import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { FormsModule } from '@angular/forms'
import { CommonModule, DatePipe } from '@angular/common';

@Component({
    selector: 'usuarios-form',
    imports: [FormsModule, CommonModule],
    providers: [DatePipe],
    templateUrl: './usuariosform.component.html'
})
export class UsuariosformComponent {

  constructor(private datePipe: DatePipe) {}

  @Input() usuarioForm: Usuario = {
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

  @Output() usuarioEmiter = new EventEmitter();

  onSubmit(): void {
    this.usuarioEmiter.emit(this.usuarioForm);
    console.log(this.usuarioForm);
  }

  public limpiar() {
    this.usuarioForm = {
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
