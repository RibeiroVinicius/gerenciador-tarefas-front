import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../interface/IUser';
import { IUserLogin } from '../../../interface/IUserLogin';
import { LoginService } from '../../../services/login.service';
import { catchError } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  loginForm: FormGroup;
  userForm: FormGroup;
  loading: boolean = false;
  showModal: boolean = false;
  user: IUser = {} as IUser;
  errorMessage: string = '';
  creationError: boolean = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", Validators.nullValidator],
      password: ["", Validators.nullValidator]
    });

    this.userForm = this.fb.group({
      id: [0],
      name: ["", Validators.nullValidator],
      email: ["", Validators.nullValidator],
      password: ["", Validators.nullValidator]
    });
  }

  ngOnInit() {
    this.initLoginForm();
    this.initUserForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.nullValidator],
      password: ["", Validators.nullValidator]
    });
  }

  initUserForm() {
    this.userForm = this.fb.group({
      id: [0],
      name: ["", Validators.nullValidator],
      email: ["", Validators.nullValidator],
      password: ["", Validators.nullValidator]
    });
  }
  login() {
    this.loading = true;
    const user: IUserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.SENHA
    };

    if (!this.validarFormLogin()) {
      this.loading = false;
      return;
    } else {
      this.loginService.login(user)
        .pipe(
          catchError(error => {
            this.tratarErros(error);
            throw error;
          })
        ).subscribe(data => {
          this.router.navigate(['/task-list']);
          this.loading = false;
        });
    }
  }

  validarFormLogin(): boolean {
    let credenciaisValidas = true;
    if (this.loginForm.get('email')?.value.length == 0) {
      alert("INFORME O USUÁRIO");
      credenciaisValidas = false;
    } else if (this.loginForm.get('password')?.value.length == 0) {
      alert("INFORME A SENHA");
      credenciaisValidas = false;
    }
    return credenciaisValidas;
  }

  tratarErros(error: any) {
    // TODO VERIFICAR OS CÓDIGOS DE ERRO E MOSTRAR MENSAGENS ADEQUADAS
  }

  tratarErroCriacao(error: any) {
    // TODO VERIFICAR OS CÓDIGOS DE ERRO E MOSTRAR MENSAGENS ADEQUADAS
  }

  onCreateUser() {
    const user: IUser = {
      id: 0,
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value
    };

    if (!this.validarFormUser()) {
      this.loading = false;
      return;
    } else {
      this.loginService.createUser(user)
        .pipe(
          catchError(error => {
            this.tratarErroCriacao(error);
            throw error;
          })
        ).subscribe(data => {
          this.closeModal();
          this.loading = false;
        });
    }
  }

  validarFormUser(): boolean {
    let credenciaisValidas = true;
    if (this.userForm.get('name')?.value.length == 0) {
      alert("INFORME O NOME DO USUÁRIO");
      credenciaisValidas = false;
    } else if (this.userForm.get('email')?.value.length == 0) {
      alert("INFORME O EMAIL");
      credenciaisValidas = false;
    } else if (this.userForm.get('senha')?.value.length == 0) {
      alert("INFORME A SENHA");
      credenciaisValidas = false;
    }
    return credenciaisValidas;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}