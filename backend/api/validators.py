import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class AlphaNumericPasswordValidator:
    def validate(self, password, user=None):
        if bool(re.match('^[\d_.]+$', password)):
            raise ValidationError(_("Password must contain at least one letter."), )
        if bool(re.match('^[a-zA-Z_.]+$', password)):
            raise ValidationError(_("Password must contain at least one number."), )