import {
  commonsAjax
} from './request'
import { cpus } from 'os';

export function login(data) {
  return commonsAjax(`/user/v1/login`, data, 'post')
}

export function actList() {
  return commonsAjax('/interaction/v1/interaction/admin/page', '', 'get')
}

export function getSubj(data) {
  return commonsAjax(`/interaction/v1/admin/interaction/${data}/subject`, '', 'get')
}

// export function getSubj(data) {
//   return commonsAjax(`/interaction/v1/admin/interaction/${data}/subject`, '', 'get')
// }
export function createSubj(data) {
  return commonsAjax(`/interaction/v1/admin/subject`, data, 'put')
}

export function startAns(data) {
  return commonsAjax(`/interaction/v1/interaction/${data.interactionId}/answerstatus/${data.status}`, '', 'get')
}

export function loopAns(data) {
  return commonsAjax(`/loop/interaction/v1/interaction/${data}/answer`)
}

export function loopSign(data) {
  return commonsAjax(`/loop/interaction/v1/interaction/${data}/sign`)
}

export function sjcj(data) {
  return commonsAjax(`/interaction/v1/interaction/${data.interactionId}/randomdraw/${data.count}`)
}

export function rewardRes(data) {
  return commonsAjax(`/interaction/v1/interaction/${data.interactionId}/user/prize/list`)
}

export function editSubj(data) {
  return commonsAjax(`/subject/v1/subject/${data.subjectId}/name`, data, 'post')
}

export function editOption(data) {
  return commonsAjax(`/subject/v1/subject/${data.subjectId}/option/${data.optionId}/info`, data, 'post')
}

export function delSub(data) {
  return commonsAjax(`/subject/v1/interaction/${data.interactionId}/subject/${data.subjectId}/${data.withOption}`, '', 'delete')
}

export function setPrize(data) {
  return commonsAjax(`/prize/v1/admin/interaction/prize`, data, 'post')
}

export function createAct(data) {
  return commonsAjax(`/interaction/v1/admin/interaction/`, data, 'put')
}

export function signNum(data) {
  return commonsAjax(`/interaction/v1/interaction/${data}/sign/noqr/status.1`)
}

export function endSign(data) {
  return commonsAjax(`/interaction/v1/interaction/${data}/sign/status.2`)
}

export function getPrize(data) {
  return commonsAjax(`/prize/v1/admin/interaction/${data}/prize`)
}

export function getRzlist(data) {
  return commonsAjax(`/people/v1/people/admin/list/${data}`)
}

export function rzStatu(data) {
  return commonsAjax(`/people/v1/people/${data.peopleId}/auditstatus/${data.auditStatus}`)
}