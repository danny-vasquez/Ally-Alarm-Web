/**
 * Puente entre React y Material Web (@material/web), la librería oficial de
 * componentes Material Design 3 de Google. Cada componente md-* es un web
 * component (Lit); `createComponent` de @lit/react genera un componente de
 * React con props y eventos tipados a partir de la clase del elemento.
 */
import { createComponent, type EventName } from '@lit/react'
import * as React from 'react'

import { MdFilledButton } from '@material/web/button/filled-button.js'
import { MdFilledTonalButton } from '@material/web/button/filled-tonal-button.js'
import { MdOutlinedButton } from '@material/web/button/outlined-button.js'
import { MdTextButton } from '@material/web/button/text-button.js'
import { MdIconButton } from '@material/web/iconbutton/icon-button.js'
import { MdList } from '@material/web/list/list.js'
import { MdListItem } from '@material/web/list/list-item.js'
import { MdOutlinedSelect } from '@material/web/select/outlined-select.js'
import { MdSelectOption } from '@material/web/select/select-option.js'
import { MdDialog } from '@material/web/dialog/dialog.js'
import { MdDivider } from '@material/web/divider/divider.js'

export const MdFilledButtonR = createComponent({
  react: React,
  tagName: 'md-filled-button',
  elementClass: MdFilledButton,
})

export const MdFilledTonalButtonR = createComponent({
  react: React,
  tagName: 'md-filled-tonal-button',
  elementClass: MdFilledTonalButton,
})

export const MdOutlinedButtonR = createComponent({
  react: React,
  tagName: 'md-outlined-button',
  elementClass: MdOutlinedButton,
})

export const MdTextButtonR = createComponent({
  react: React,
  tagName: 'md-text-button',
  elementClass: MdTextButton,
})

export const MdIconButtonR = createComponent({
  react: React,
  tagName: 'md-icon-button',
  elementClass: MdIconButton,
})

export const MdListR = createComponent({
  react: React,
  tagName: 'md-list',
  elementClass: MdList,
})

export const MdListItemR = createComponent({
  react: React,
  tagName: 'md-list-item',
  elementClass: MdListItem,
})

export const MdOutlinedSelectR = createComponent({
  react: React,
  tagName: 'md-outlined-select',
  elementClass: MdOutlinedSelect,
  events: {
    onchange: 'change' as EventName<Event>,
  },
})

export const MdSelectOptionR = createComponent({
  react: React,
  tagName: 'md-select-option',
  elementClass: MdSelectOption,
})

export const MdDialogR = createComponent({
  react: React,
  tagName: 'md-dialog',
  elementClass: MdDialog,
  events: {
    onclose: 'close' as EventName<Event>,
    oncancel: 'cancel' as EventName<Event>,
  },
})

export const MdDividerR = createComponent({
  react: React,
  tagName: 'md-divider',
  elementClass: MdDivider,
})
