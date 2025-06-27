import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AnalitoTipo } from '../../../analito-tipo/interfaces/analito-tipo.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { PeticionService } from '../../../peticion/service/peticion.service';
import { Peticion } from '../../../peticion/interfaces/peticion.interface';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { Usuario } from '../../../usuario/interfaces/usuario.interface';
import { AnalitoTipoService } from '../../../analito-tipo/service/analito-tipo.service';
import { Medico } from '../../interfaces/medico.interface';


interface Grupo {
  nombre:  string;
  analitos: AnalitoTipo[];
  abierto:  boolean;
  marcado: boolean;
}


@Component({
    selector: 'app-peticiones-page',
    imports: [CommonModule, ReactiveFormsModule, DatePipe],
    templateUrl: './peticiones-page.component.html'
})
export class PeticionesPageComponent implements OnInit {

  authMedicoService = inject(AuthService)
  peticionService = inject(PeticionService)
  peticionEntrada?: Peticion;

  usuarioService = inject(UsuarioService)
  authService = inject(AuthService)

  router = inject(Router)

  usuariosFiltrados: Usuario[] = []
  usuarioSelected?:Usuario;
  grupos = signal<Grupo[]>([]);

  analitoService = inject(AnalitoTipoService);
  analitosPeticion: AnalitoTipo[] =[]

   fb = inject(FormBuilder);
    peticionForm = this.fb.group({
    sip: ['', Validators.required],
    nombre: [{ value: '', disabled:true}, Validators.required],
    nacimiento: [{ value: this.peticionEntrada?.usuario.fechaNacimiento.substring(0,10) || '', disabled:true}, Validators.required],
    direccion: [{ value: this.peticionEntrada?.usuario.direccion || '', disabled:true}],
    descripcion: ['',Validators.required],
    visible: [false]
  });

    ngOnInit(): void {
      this.peticionForm.get('sip')!.valueChanges.subscribe(sip =>{
        this.usuarioService.findAll().subscribe({
          next: usuariosDb => this.usuariosFiltrados = usuariosDb.filter(u => u.sip.toUpperCase().includes(sip?.toUpperCase()||''))
        });
      });

     this.analitoService.findAll().subscribe(totalAnalitos => {
        const map = new Map<string, AnalitoTipo[]>();
        for (const analito of totalAnalitos) {
          const claveGrupo = analito.grupoAnalitico ?? 'Sin grupo';
          if (!map.has(claveGrupo))
            map.set(claveGrupo, []);
          map.get(claveGrupo)!.push(analito);
        }

          const grupo: Grupo[] = [];
          map.forEach((analitos, nombre) => {
            grupo.push({ nombre, analitos, abierto: false, marcado: false });

          });

        this.grupos.set(grupo);

        if(this.peticionService.peticionSelectedService)
          this.iniciarEstadoPageActualizacion()
      });
    }

    iniciarEstadoPageActualizacion(): void {
      const grupos = this.grupos();
      this.peticionEntrada! = this.peticionService.peticionSelectedService!
      console.log(this.peticionEntrada)
      this.seleccionarPaciente(this.peticionEntrada!.usuario)
      this.peticionForm.patchValue({
        descripcion: this.peticionEntrada!.descripcion,
        visible: this.peticionEntrada!.visible
      })

      this.peticionEntrada!.analitosTipos.forEach(aE =>{
        grupos.forEach(g =>{
          g.analitos.forEach(a => {
            if(aE.grupoAnalitico === a.grupoAnalitico && aE.nombre === a.nombre)
              a.seleccionado = true
          })
          g.marcado = g.analitos.every(a => a.seleccionado)
        })
      })
      this.grupos.set([...grupos])
    }


    desplegar(i: number) {
      const grupos = this.grupos();
      grupos[i].abierto = !grupos[i].abierto;
      this.grupos.set([...grupos]);
    }


    actualizarGrupoDesplegable(i: number, checked: boolean) {
      const grupos = this.grupos();
      grupos[i].marcado = checked;
      grupos[i].analitos.forEach(a => a.seleccionado = checked);
      this.grupos.set([...grupos]);
    }

    tieneMarcados(indice: number): boolean {
      const grupo = this.grupos()[indice];
      return grupo.analitos.some(a => a.seleccionado) && !grupo.analitos.every(a => a.seleccionado);
    }

    actualizarEstadoAnalito(i: number, a: AnalitoTipo, checked: boolean) {
      const grupo = this.grupos();
      a.seleccionado = checked;

      if (!checked) { // si uno queda sin marcar, desmarca el grupo
        grupo[i].marcado = false;
      } else {
        grupo[i].marcado = grupo[i].analitos.every(x => x.seleccionado); // si todos quedaron marcados, marca el grupo
      }
      this.grupos.set([...grupo]);
    }


    seleccionarPaciente(usuario: Usuario){
      this.usuarioSelected = usuario;
      this.peticionForm.patchValue({
        sip: usuario.sip,
        nombre: `${usuario.nombre} ${usuario.apellidos}`,
        nacimiento: usuario.fechaNacimiento.substring(0,10),
        direccion: usuario.direccion
      })
    }

    onSubmit(){
      this.analitosPeticion = [];
      const usuarioActual = this.authService.usuario();

      if(!this.usuarioSelected) {
        alert('no existe usuario seleccionado')
        return
      }
      else if(!this.authService.esMedico) {
        alert('Solo un medico puede generar peticiones')
        return
      }
      else{
        const medico = usuarioActual() as Medico;
        this.grupos().map(g =>
          g.analitos.map(a => {
              if (a.seleccionado) {
                this.analitosPeticion.push(a);
                console.log(a);
              }
            })
          )

        console.log('Analitos seleccionados (array):', this.analitosPeticion.length);


        if(this.analitosPeticion.length === 0) {
          alert('debe haber peticiones escogidas')
          return
        }    

        else{
            const peticionEnvio: Peticion = {
            peticionId: this.peticionEntrada?.peticionId ?? undefined,
            fechaPeticion: this.peticionEntrada?.fechaPeticion ?? new Date().toISOString(),
            descripcion: this.peticionForm.value.descripcion || '',
            finalizado: this.peticionEntrada?.finalizado || false,
            visible: this.peticionForm.value.visible || false,
            usuario: this.usuarioSelected!,
            medico: medico,
            analitosTipos: this.analitosPeticion,
          }

          if(peticionEnvio.peticionId)
            this.peticionService.update(peticionEnvio).subscribe({
              next: (resp: HttpResponse<Peticion>) => {
                if ((resp.status === 200 || resp.status === 201) && resp.body) {
                  this.router.navigateByUrl('/sanitario/home')
                }
              },
              error: (err: HttpErrorResponse) => {
                const mensajes = Object.values(err.error as Record<string,string>).join('\n');
                   alert(`Error:\n${mensajes}`);
              }
          })

          else
            this.peticionService.save(peticionEnvio).subscribe({
              next: (resp: HttpResponse<Peticion>) => {
                if ((resp.status === 200 || resp.status === 201) && resp.body) {
                  this.router.navigateByUrl('/sanitario/home')

                }
              },
              error: (err: HttpErrorResponse) => {
                const mensajes = Object.values(err.error as Record<string,string>).join('\n');
                   alert(`Error:\n${mensajes}`);
              }
          })
        }
      }
    }
}
