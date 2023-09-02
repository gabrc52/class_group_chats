import { MATRIX_HOMESERVER } from "$env/static/private"

export const power_level_content_override = {
    "events": {
      "m.room.name": 0,
      "m.room.power_levels": 100,
      "m.room.history_visibility": 100,
      "m.room.canonical_alias": 50,
      "m.room.avatar": 0,
      "m.room.tombstone": 100,
      "m.room.server_acl": 100,
      "m.room.encryption": 0,
      "m.room.topic": 0,
      "m.room.pinned_events": 0,
      "m.reaction": 0,
      "m.room.redaction": 0,
      "org.matrix.msc3401.call": 0,
      "org.matrix.msc3401.call.member": 0,
      "im.vector.modular.widgets": 0,
      "io.element.voice_broadcast_info": 0
    },
  }