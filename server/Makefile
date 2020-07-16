build:
	gcloud builds submit \
		--quiet \
		--tag gcr.io/droppy-283501/api \
		--timeout="2500"

deploy:
	gcloud beta run deploy api \
		--quiet \
		--region us-central1 \
		--image gcr.io/droppy-283501/api \
		--platform managed \
		--allow-unauthenticated
