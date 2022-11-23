export const modal = (text) => {
	const html = `<div class="custom-modal"> 
                    <div> <button
								type="button"
								class="close"
								id="close"
							>
								&times;
							</button>
                    </div>
                    <p class="modal-text">${text}</p>
                  </div>`;

	return html;
};
