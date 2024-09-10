<template>
  <div>
    <div class="q-ma-md page-container">
      <form ref="myForm">
        <div class="q-ma-md">
          <q-banner dense inline-actions class="text-white bg-primary q-px-md">
            Dados do User
            <template v-slot:action>
              <q-img src="~assets/mentoring.png" />
            </template>
          </q-banner>
          <div class="page-input-container q-pa-md">
            <div class="q-mt-lg">
              <div class="row items-center q-mb-md">
                <q-icon name="person_outline" size="sm" />
                <span class="q-pl-sm text-subtitle2"
                  >Identificação do User</span
                >
              </div>
              <q-separator color="grey-13" size="1px" />
            </div>
            <div class="row q-my-sm">
              <q-input
                outlined
                label="Nome"
                dense
                ref="nameRef"
                :rules="[(val) => !!val || 'Por favor indicar o nome']"
                lazy-rules
                class="col"
                v-model="user.employee.name"
                @update:model-value="(value) => (filter = value)"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="user.employee.name = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                outlined
                label="Apelido"
                dense
                :rules="[(val) => !!val || 'Por favor indicar o apelido']"
                lazy-rules
                ref="surnameRef"
                class="col q-ml-md"
                v-model="user.employee.surname"
                @update:model-value="(value) => (filter = value)"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="user.employee.surname = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
            <div class="row q-my-sm q-mt-md">
              <q-input
                outlined
                label="NUIT"
                dense
                ref="nuitRef"
                class="col"
                mask="#########"
                lazy-rules
                :rules="[
                  (val) =>
                    isValidNuit(val) || 'Por favor indicar um NUIT válido.',
                ]"
                fill-mask="#"
                v-model="user.employee.nuit"
                @update:model-value="(value) => (filter = value)"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="user.employee.nuit = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <span class="col" />
            </div>
            <div class="q-mt-lg">
              <div class="row items-center q-mb-md">
                <q-icon name="call" size="sm" />
                <span class="q-pl-sm text-subtitle2">Contacto</span>
              </div>
              <q-separator color="grey-13" size="1px" />
            </div>
            <div class="row q-my-sm">
              <q-input
                outlined
                label="Numero de Telefone"
                dense
                ref="phoneNumberRef"
                mask="#########"
                hint="Formato: #########"
                lazy-rules
                :rules="[
                  (val) =>
                    isValidPhoneNumber(val) ||
                    'Por favor indicar um contacto válido.',
                ]"
                fill-mask="#"
                class="col"
                v-model="user.employee.phoneNumber"
                @update:model-value="(value) => (filter = value)"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="user.employee.phoneNumber = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>

              <q-input
                outlined
                label="Email"
                dense
                ref="emailRef"
                class="col q-ml-md"
                :rules="[(val) => isValidEmail(val) || 'Email inválido']"
                lazy-rules
                v-model="user.employee.email"
                @update:model-value="(value) => (filter = value)"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="user.employee.email = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>

            <div class="q-mt-lg">
              <div class="row items-center q-mb-md">
                <q-icon name="lock_outline" size="sm" />
                <span class="q-pl-sm text-subtitle2">Credenciais</span>
              </div>
              <q-separator color="grey-13" size="1px" />
            </div>
            <div class="row q-my-sm">
              <q-input
                outlined
                label="Nome do Utilizador"
                dense
                ref="usernameRef"
                :rules="[(val) => !!val || 'Por favor indicar o nome']"
                lazy-rules
                class="col"
                v-model="user.username"
                @update:model-value="(value) => (filter = value)"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="user.username = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>

              <q-select
                class="col q-ml-md"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                outlined
                ref="roleRef"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Por favor indicar o Vínculo Laboral',
                ]"
                v-model="user.role"
                :options="roles"
                option-value="id"
                option-label="label"
                label="Perfil de Acesso"
              />
            </div>

            <div class="q-mt-lg">
              <div class="row items-center q-mb-md">
                <q-icon name="engineering" size="sm" />
                <span class="q-pl-sm text-subtitle2">Informação Laboral</span>
              </div>
              <q-separator color="grey-13" size="1px" />
            </div>
            <div class="row q-my-sm">
              <q-select
                class="col"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                outlined
                ref="categoryRef"
                :rules="[
                  (val) =>
                    !!val || 'Por favor indicar a categoria profissional',
                ]"
                lazy-rules
                v-model="user.employee.professionalCategory"
                :options="filterRedCategories"
                option-value="id"
                option-label="description"
                @filter="filterCategories"
                label="Categoria Profissional"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sem Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input
                outlined
                label="Ano de Formação"
                dense
                ref="trainingYearRef"
                :rules="[
                  (val) =>
                    isValidTrainingYear(val) || 'Ano de formação inválido',
                ]"
                lazy-rules
                mask="####"
                fill-mask="#"
                class="col q-ml-md"
                v-model="user.employee.trainingYear"
                @update:model-value="(value) => (filter = value)"
              >
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="user.employee.trainingYear = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>

              <q-select
                class="col q-ml-md"
                use-input
                hide-selected
                @update:model-value="(val) => onChangeVinculo(val)"
                fill-input
                input-debounce="0"
                dense
                outlined
                ref="vinculoRef"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Por favor indicar o Vínculo Laboral',
                ]"
                v-model="selectedUserLaborInfo"
                :options="userLaborInfo"
                label="Vínculo Laboral"
              />
            </div>
            <div class="row q-my-sm">
              <q-select
                v-if="isPartnerUser"
                class="col-4"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                outlined
                ref="partnerRef"
                lazy-rules
                :rules="[(val) => !!val || 'Por favor indicar o Nome da ONG']"
                v-model="user.employee.partner"
                :options="filterRedPartners"
                option-value="id"
                option-label="description"
                @filter="filterPartners"
                label="Nome da ONG"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sem Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="q-mt-lg">
              <div class="row items-center q-mb-md">
                <q-icon name="local_hospital" size="sm" />
                <span class="q-pl-sm text-subtitle2">Unidade Sanitária</span>
              </div>
              <q-separator color="grey-13" size="1px" />
            </div>
            <div class="row q-my-sm">
              <q-select
                class="col"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @update:model-value="onChangeProvincia()"
                dense
                outlined
                ref="provinceRef"
                lazy-rules
                :rules="[(val) => !!val || 'Por favor indicar a Província']"
                v-model="user.employee.locations[0].province"
                :options="provinces"
                option-value="id"
                option-label="designation"
                label="Província"
              />

              <q-select
                class="col q-ml-md"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                outlined
                ref="districtRef"
                v-model="user.employee.locations[0].district"
                :options="filterRedDistricts"
                option-value="id"
                option-label="description"
                @filter="filterDistricts"
                label="Distrito"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sem Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                class="col q-ml-md"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                outlined
                ref="hfRef"
                v-model="user.employee.locations[0].healthFacility"
                :options="filterRedHealthFacilities"
                option-value="id"
                option-label="healthFacility"
                @filter="filterHealthFacilities"
                label="Unidade Sanitária"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sem Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="q-mt-lg">
              <div class="row items-center q-mb-md">
                <q-icon name="local_hospital" size="sm" />
                <span class="q-pl-sm text-subtitle2">Estado do Utilizador</span>
              </div>
              <q-separator color="grey-13" size="1px" />
            </div>
            <div class="row q-my-sm q-mt-md">
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @update:model-value="onChangeStatus()"
                dense
                outlined
                ref="statusRef"
                lazy-rules
                :rules="[(val) => !!val || 'Por favor indicar o STatus']"
                v-model="user.lifeCycleStatus"
                :options="statuses"
                label="Status"
              />
            </div>
            <div class="row q-my-sm">
              <q-space />
              <q-btn
                label="Cancelar"
                class="float-right"
                color="red"
                @click="$emit('cancel')"
              />
              <q-btn
                class="float-right q-ml-md"
                type="submit"
                label="Submeter"
                color="primary"
                @click="submitForm()"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { inject, ref, computed, onMounted } from 'vue';
import User from 'src/stores/model/user/User';
import Employee from 'src/stores/model/employee/Employee';
import provinceService from 'src/services/api/province/provinceService';
import districtService from 'src/services/api/district/districtService';
import healthFacilityService from 'src/services/api/healthfacility/healthFacilityService';
import professionalCategoryService from 'src/services/api/professionalcategory/professionalCategoryService';
import Location from 'src/stores/model/location/Location';
import { useStringUtils } from 'src/composables/shared/stringutils/stringUtils';
import partnerService from 'src/services/api/partner/partnerService';
import useUser from 'src/composables/user/userMethods';
import userService from 'src/services/api/user/UsersService';
import userRolesService from 'src/services/api/user/UserRolesService';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { Loading, QSpinnerRings } from 'quasar';
import roleService from 'src/services/api/role/roleService';
import { listActiveAndInactiveLifeCycleStatuses } from '../../utils/LifeCycleStatus';

const user = ref(
  new User({
    employee: new Employee({
      locations: [
        {
          location: new Location(),
        },
      ],
    }),
  })
);

const emit = defineEmits(['goToUseringAreas', 'close']);

const { createDTOFromUser } = useUser();
const { stringContains } = useStringUtils();
const { alertSucess, alertError, alertSucessAction } = useSwal();
const filterRedDistricts = ref([]);
const filterRedHealthFacilities = ref([]);
const filterRedCategories = ref([]);
const filterRedPartners = ref([]);
const selectedUserLaborInfo = ref('');
const userLaborInfo = ref(['SNS', 'ONG']);
const location = ref(new Location());

//Ref's
const nameRef = ref(null);
const surnameRef = ref(null);
const nuitRef = ref(null);
const phoneNumberRef = ref(null);
const emailRef = ref(null);
const categoryRef = ref(null);
const trainingYearRef = ref(null);
const vinculoRef = ref(null);
const partnerRef = ref(null);
const provinceRef = ref(null);
const districtRef = ref(null);
const hfRef = ref(null);
const usernameRef = ref(null);
const statuses = ref(listActiveAndInactiveLifeCycleStatuses());
// const right = ref('');

const selectedUser = inject('selectedUser');
const step = inject('step');

const isEditStep = computed(() => {
  return step.value === 'userEdit';
});

const roles = computed(() => {
  const roles = roleService.piniaGetAll().map((role) => ({
    ...role,
    label: `${role.description} ${role.level}`,
  }));

  return roles.filter((item) => item.code !== 'ROOT');
});

const roleId = computed(() => {
  const userRoles = userRolesService.piniaGetAll();
  const filterred = userRoles.filter((item) => item?.user_id == user.value.id);
  return filterred[0]?.role_id;
});

const init = () => {
  if (isEditStep.value) {
    user.value = Object.assign({}, selectedUser.value);
    selectedUserLaborInfo.value =
      user.value.employee.partner.name === 'MISAU' ? 'SNS' : 'ONG';
  }
  user.value.role = roles.value.filter((item) => item.id === roleId.value)[0];

  provinceService.getAll();
  districtService.getAll();
  healthFacilityService.getAllHealthFacilities();
};
onMounted(() => {
  init();
});

const provinces = computed(() => {
  return provinceService.piniaGetAll();
});

const isPartnerUser = computed(() => {
  return selectedUserLaborInfo.value === 'ONG';
});

const categories = computed(() => {
  return professionalCategoryService.piniaGetAll();
});

const districts = computed(() => {
  if (
    user.value.employee.locations[0].province !== null &&
    user.value.employee.locations[0].province !== undefined
  ) {
    return districtService.getAllDistrictByProvinceId(
      user.value.employee.locations[0].province.id
    );
  } else {
    return null;
  }
});

const partners = computed(() => {
  return partnerService.piniaGetAll();
});

const myForm = ref(null);

const submitForm = () => {
  nameRef.value.validate();
  surnameRef.value.validate();
  nuitRef.value.validate();
  phoneNumberRef.value.validate();
  emailRef.value.validate();
  categoryRef.value.validate();
  trainingYearRef.value.validate();
  vinculoRef.value.validate();
  if (partnerRef.value !== null) partnerRef.value.validate();
  provinceRef.value.validate();
  districtRef.value.validate();
  hfRef.value.validate();
  usernameRef.value.validate();

  if (
    !nameRef.value.hasError &&
    !surnameRef.value.hasError &&
    !phoneNumberRef.value.hasError &&
    !usernameRef.value.hasError &&
    !emailRef.value.hasError &&
    !categoryRef.value.hasError &&
    !trainingYearRef.value.hasError &&
    !vinculoRef.value.hasError &&
    !provinceRef.value.hasError &&
    !districtRef.value.hasError &&
    !hfRef.value.hasError
  ) {
    Loading.show({
      spinner: QSpinnerRings,
    });
    const target_copy = Object.assign({}, user.value);
    const userDTO = createDTOFromUser(new User(target_copy));

    if (isEditStep.value) {
      userService
        .updateUser(userDTO)
        .then((resp) => handleResponse(resp, 'User actualizado.', 'close'))
        .catch((error) => handleError(error, 'Erro ao atualizar o User'));
    } else {
      userService
        .saveUser(userDTO)
        .then((resp) =>
          handleResponse(resp, 'User criado com sucesso', 'cancel')
        )
        .catch((error) =>
          handleError(error, 'Ocorreu um erro ao tentar criar User')
        );
    }
  }
};

const handleResponse = (resp, successMessage, emitAction) => {
  if (resp.status === 200 || resp.status === 201) {
    userRolesService
      .mergeUserRole(resp.data.id, user.value.role.id)
      .then(() => {
        alertSucess(successMessage).then(() => {
          emit(emitAction);
        });
      });
  } else {
    alertError(resp?.message);
  }
  Loading.hide();
};

const handleError = (error, errorMessage) => {
  Loading.hide();
  console.error('Error', error);
  alertError(errorMessage);
};

const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(email);
};
const isValidNuit = (nuit) => {
  return nuit !== '' && !stringContains(nuit, '#');
};

const isValidTrainingYear = (year) => {
  return year !== '' && !stringContains(year, '#');
};

const isValidPhoneNumber = (phoneNumber) => {
  return phoneNumber !== '' && !stringContains(phoneNumber, '_');
};

const filterPartners = (val, update, abort) => {
  const stringOptions = partners;
  if (val === '') {
    update(() => {
      filterRedPartners.value = stringOptions.value.map((partner) => partner);
    });
  } else if (stringOptions.value.length === 0) {
    update(() => {
      filterRedPartners.value = [];
    });
  } else {
    update(() => {
      filterRedPartners.value = stringOptions.value
        .map((partner) => partner)
        .filter((partner) => {
          return (
            partner &&
            partner.description.toLowerCase().indexOf(val.toLowerCase()) !== -1
          );
        });
    });
  }
};

const filterDistricts = (val, update, abort) => {
  const stringOptions = districts;
  if (val === '') {
    update(() => {
      filterRedDistricts.value = stringOptions.value.map(
        (district) => district
      );
    });
  } else if (stringOptions.value.length === 0) {
    update(() => {
      filterRedDistricts.value = [];
    });
  } else {
    update(() => {
      filterRedDistricts.value = stringOptions.value
        .map((district) => district)
        .filter((district) => {
          return (
            district &&
            district.description.toLowerCase().indexOf(val.toLowerCase()) !== -1
          );
        });
    });
  }
};

const healthFacilities = computed(() => {
  if (
    user.value.employee.locations[0].district !== null &&
    user.value.employee.locations[0].district !== undefined
  ) {
    return healthFacilityService.getAllOfDistrict(
      user.value.employee.locations[0].district.id
    );
  } else {
    return null;
  }
});

const filterHealthFacilities = (val, update, abort) => {
  const stringOptions = healthFacilities;
  if (val === '') {
    update(() => {
      filterRedHealthFacilities.value = stringOptions.value.map(
        (healthFacility) => healthFacility
      );
    });
  } else if (stringOptions.value.length === 0) {
    update(() => {
      filterRedHealthFacilities.value = [];
    });
  } else {
    update(() => {
      filterRedHealthFacilities.value = stringOptions.value
        .map((healthFacility) => healthFacility)
        .filter((healthFacility) => {
          return (
            healthFacility &&
            healthFacility.healthFacility
              .toLowerCase()
              .indexOf(val.toLowerCase()) !== -1
          );
        });
    });
  }
};

const filterCategories = (val, update, abort) => {
  const stringOptions = categories;
  if (val === '') {
    update(() => {
      filterRedCategories.value = stringOptions.value.map(
        (category) => category
      );
    });
  } else if (stringOptions.value.length === 0) {
    update(() => {
      filterRedCategories.value = [];
    });
  } else {
    update(() => {
      filterRedCategories.value = stringOptions.value
        .map((category) => category)
        .filter((category) => {
          return (
            category &&
            category.description.toLowerCase().indexOf(val.toLowerCase()) !== -1
          );
        });
    });
  }
};

const onChangeProvincia = () => {
  user.value.employee.locations[0].district = '';
  user.value.employee.locations[0].district = '';
};

const onChangeStatus = (status) => {
  user.value.status = status;
};

const onChangeVinculo = (selected) => {
  if (selected === 'SNS') {
    user.value.employee.partner = partnerService.getByName('MISAU');
  } else {
    user.value.employee.partner = '';
  }
};
</script>
<style></style>
