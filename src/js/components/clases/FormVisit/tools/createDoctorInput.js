import { inputDoctorVisit } from '../utils/index.js';

export const createDoctorInput = ({ doctor = '', params = '', value }) => {
    const doctorInputContainer = document.createElement('div');
    doctorInputContainer.classList.add('doctor-inputs');

    const doctorInput = inputDoctorVisit
        .map(item => {
            if (item.value === (doctor || value)) {
                return item.content.map(content => {
                    if (!!params) {
                        content.value = params[content?.name];
                        if (content.type === 'radio') {
                            content.contentRadio.forEach(changeChecked => {
                                if (content.value === changeChecked.value) {
                                    changeChecked.checked = 'checked';
                                } else {
                                    changeChecked.checked = '';
                                }
                            });
                        }
                    } else {
                        content.value = '';
                    }

                    return content.renderContent(content);
                });
            }
        })
        .find(item => !!item)
        ?.join('');

    doctorInputContainer.insertAdjacentHTML('afterbegin', doctorInput || '');

    return doctorInputContainer;
};
