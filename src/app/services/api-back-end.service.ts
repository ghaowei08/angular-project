import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiBackEndService {

  constructor(private http: HttpClient) { }

  getBackEnd_url() {
    // return 'http://localhost:3000/api';
    return '/api';
  }
  
  verifyToken(data) {
    return this.http.post(`${this.getBackEnd_url()}/token/verify`, { data }, httpOptions);
  }

  onsite_get_token(data) {
    return this.http.post(`${this.getBackEnd_url()}/user/onsite_get_token`, { data }, httpOptions);
  }

  login(data) {
    return this.http.post(`${this.getBackEnd_url()}/user/login`, { data }, httpOptions);
  }

  forgotPassword(data) {
    return this.http.post(`${this.getBackEnd_url()}/password/forgot`, { data }, httpOptions);
  }

  verify_forgotPassword(data) {
    return this.http.post(`${this.getBackEnd_url()}/password/verify`, { data }, httpOptions);
  }

  change_password(data) {
    return this.http.post(`${this.getBackEnd_url()}/password/change`, { data }, httpOptions);
  }

  console_getAllMessages(data) {
    return this.http.post(`${this.getBackEnd_url()}/console/imessage/getAllMessages`, { data }, httpOptions);
  }

  console_updateStatus(data) {
    return this.http.post(`${this.getBackEnd_url()}/console/imessage/updateStatus`, { data }, httpOptions);
  }

  console_updateMessage(data) {
    return this.http.post(`${this.getBackEnd_url()}/console/imessage/updateMessage`, { data }, httpOptions);
  }

  console_get_sessions(data) {
    return this.http.post(`${this.getBackEnd_url()}/console/ivote/get_sessions`, { data }, httpOptions);
  }

  get_session_info() {
    return this.http.get(`${this.getBackEnd_url()}/get_session_info`, httpOptions);
  }

  get_video_info_from_console() {
    return this.http.get(`${this.getBackEnd_url()}/get_video_info`, httpOptions);
  }

  get_show_info_from_console() {
    return this.http.get(`${this.getBackEnd_url()}/get_show_info`, httpOptions);
  }

  get_config() {
    return this.http.get(`${this.getBackEnd_url()}/config`, httpOptions);
  }

  // post_config() {
  //   return this.http.post(`${this.getBackEnd_url()}/config`, {data: 'test'}, httpOptions);
  // }

  get_rooms(data?) {
    return this.http.get(`${this.getBackEnd_url()}/room`, httpOptions);
  }

  get_room_day(data?) {
    return this.http.get(`${this.getBackEnd_url()}/room/day`, httpOptions);
  }

  update_config(data?) {
    return this.http.post(`${this.getBackEnd_url()}/room/update`, {data}, httpOptions);
  }

  check_login_status(data) {
    return this.http.post(this.getBackEnd_url() + "/user/check_login_status", { data }, httpOptions);
  }

}
